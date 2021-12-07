import React, { useState, useContext, useEffect, useRef } from 'react'
import type { FC } from 'react'
import QRCode from 'qrcode.react'
import { context, usePrefersColor } from 'dumi/theme'
import Spin from './Spin'
import { ROUTE_MSG_TYPE } from 'dumi-theme-mobile/es/layouts/demo'
import './Device.less'

interface IDeviceProps {
  className?: string
  url: string
}

const Device: FC<IDeviceProps> = ({ url, className }) => {
  const iframeRef = useRef<HTMLIFrameElement>()
  const [iframeSrc, setIframeSrc] = useState<string>()
  const [renderKey, setRenderKey] = useState(Math.random())
  const [loading, setLoading] = useState(true)
  const [color] = usePrefersColor()
  const {
    config: { mode, theme },
  } = useContext(context)
  // const carrier = theme?.carrier || 'dumi'

  // re-render iframe if prefers color changed
  useEffect(() => {
    setRenderKey(Math.random())
  }, [color])

  // control iframe page update
  useEffect(() => {
    const { origin } = window.location

    if (!iframeSrc || !url.startsWith(origin)) {
      // set iframe src directly if it is the first render or custom url
      setIframeSrc(url)
    } else {
      const pathname = url
        // discard origin prefix
        .replace(origin, '')
        // discard router base
        .replace(`${(window as any)?.routerBase || ''}`.replace(/\/$/, ''), '')

      // update iframe page route via postmessage, to avoid page refresh
      iframeRef.current?.contentWindow.postMessage(
        { type: ROUTE_MSG_TYPE, value: pathname },
        '*'
      )
    }
  }, [url])

  const onLoad = (e) => {
    //  Toast.clear()
    setLoading(false)
  }

  return (
    <div
      className={['__dumi-default-device'].concat(className).join(' ')}
      data-device-type="iOS"
      data-mode={mode}
    >
      {/* <div className="__dumi-default-device-status">
       <span className="__dumi-default-device-status-carrier">{carrier}</span>
       <span>10:24</span>
       </div>*/}
      <div className="mobile-header" />
      <Spin spinning={loading} wrapperClassName="wrapper-loading">
        <div className="mobile-content">
          <iframe
            ref={iframeRef}
            title="dumi-previewer"
            src={`${iframeSrc}?iframe`}
            onLoad={onLoad}
            key={renderKey}
          />
          <div className="__dumi-default-device-action">
            <button
              className="__dumi-default-icon"
              role="refresh"
              onClick={() => {
                setLoading(true)
                setTimeout(() => {
                  setRenderKey(Math.random())
                })
              }}
            />
            <button className="__dumi-default-icon" role="qrcode">
              {url && <QRCode value={url} size={96} />}
            </button>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="__dumi-default-icon"
              role="open-demo"
            />
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default Device
