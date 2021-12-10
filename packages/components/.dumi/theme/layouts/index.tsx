import React, { useState, useEffect, useContext } from 'react'
import type { IPreviewerComponentProps } from 'dumi/theme'
import { context, useDemoUrl } from 'dumi/theme'
import Layout from 'dumi-theme-default/es/layout'
import type { IRouteComponentProps } from '@umijs/types'
import Device from '../components/Device'
import { ACTIVE_MSG_TYPE } from '../builtins/Previewer'
import './layout.less'

const MobileLayout: React.FC<IRouteComponentProps> = ({
  children,
  ...props
}) => {
  const ctx = useContext(context)
  const {
    config: { mode },
    demos,
    meta,
  } = ctx
  const [demo, setDemo] = useState<IPreviewerComponentProps>(null)

  const builtinDemoUrl = useDemoUrl(demo?.identifier)

  useEffect(() => {
    const handler = (ev: any) => {
      if (ev.data.type === ACTIVE_MSG_TYPE) {
        setDemo(JSON.parse(ev.data.value))
      }
    }

    window.addEventListener('message', handler)

    return () => window.removeEventListener('message', handler)
  }, [])

  // clear demoId when route changed
  useEffect(() => {
    setDemo(null)
  }, [props.location.pathname])

  return (
    <Layout {...props}>
      <div className="__dumi-default-mobile-content">
        {demo &&
          (demo.simulator !== false ? (
            <Device
              className="__dumi-default-mobile-content-device"
              url={demo.demoUrl || builtinDemoUrl}
            />
          ) : meta.mobile !== false && demos[demo.identifier] ? (
            <div className="__dumi-default-device" data-mode={mode}>
              {React.createElement(demos[demo.identifier].component)}
            </div>
          ) : (
            <></>
          ))}
        <article>{children}</article>
      </div>
    </Layout>
  )
}

export default MobileLayout
