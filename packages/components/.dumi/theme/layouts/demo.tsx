import React, { useEffect, useContext, useRef } from 'react'
import type { IRouteComponentProps } from '@umijs/types'
import { history, useLocation } from 'dumi'
import cls from 'classnames'
import { context } from 'dumi/theme'
import vl from 'umi-hd'
import flex from 'umi-hd/lib/flex'
import vw from 'umi-hd/lib/vw'
import vh from 'umi-hd/lib/vh'
import { TouchEmulator } from '../builtins/TouchEmulator'
import type IThemeConfig from '../typing/config'
import './demo.less'

export const ROUTE_MSG_TYPE = 'dumi:update-iframe-route'

// available HD modes
const HD_MODES = {
  vl,
  flex,
  vw,
  vh,
}

const MobileDemoLayout: React.FC<IRouteComponentProps> = ({ children }) => {
  const { config } = useContext(context)
  const location = useLocation()
  const isIframe = 'iframe' in (location.query || {})
  const target = useRef<HTMLDivElement>(null)
  const { hd: { rules = [{ mode: 'vw', options: [100, 750] }] } = {} } =
    config.theme as IThemeConfig

  useEffect(() => {
    // Simulate the touch event of mobile terminal
    if (target.current) {
      TouchEmulator(target.current)
    }

    // listen route change message
    const handler = (ev: MessageEvent) => {
      if (ev.data.type === ROUTE_MSG_TYPE) {
        history.push(ev.data.value)
      }
    }

    window.addEventListener('message', handler)

    return () => window.removeEventListener('message', handler)
  }, [])

  useEffect(() => {
    const handler = () => {
      const { clientWidth } = document.documentElement

      rules
        // discard invalid rules
        .filter((rule) => HD_MODES[rule.mode])
        // match first valid rule
        .some((rule) => {
          if (
            // without min & max width
            (Number.isNaN(rule.minWidth * 1) &&
              Number.isNaN(rule.maxWidth * 1)) ||
            // min width only
            (Number.isNaN(rule.maxWidth * 1) && clientWidth > rule.minWidth) ||
            // max width only
            (Number.isNaN(rule.minWidth * 1) && clientWidth < rule.maxWidth) ||
            // both min & max width
            (clientWidth > rule.minWidth && clientWidth < rule.maxWidth)
          ) {
            HD_MODES[rule.mode](...[].concat(rule.options))
            document.documentElement.setAttribute('data-scale', 'true')
            return true
          }
        })
    }

    handler()
    window.addEventListener('resize', handler)

    return () => window.removeEventListener('resize', handler)
  }, [rules])

  return (
    <div
      className={cls('__dumi-default-mobile-demo-layout', {
        iframe: isIframe,
      })}
      ref={target}
    >
      {isIframe ? (
        children
      ) : (
        <div className="mobile-container">
          <div className="mobile-header" />
          <div className="mobile-content">{children}</div>
          <div className="mobile-footer" />
        </div>
      )}
    </div>
  )
}

export default MobileDemoLayout
