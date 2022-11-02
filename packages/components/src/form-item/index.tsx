import React, { useEffect, useRef, useState } from 'react'
import cls from 'classnames'
import { pickDataProps, usePrefixCls } from '../__builtins__'
import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/react'
import { FormLayoutShallowContext, useFormLayout } from '../form-layout'
import { List, Popover } from 'antd-mobile'
import { ListItemProps } from 'antd-mobile/es/components/list'
import {
  CheckCircleOutline,
  CloseCircleOutline,
  ExclamationCircleOutline,
} from 'antd-mobile-icons'

export interface IFormItemProps extends ListItemProps {
  className?: string
  style?: React.CSSProperties
  label?: string
  labelStyle?: React.CSSProperties
  labelAlign?: 'left' | 'right'
  labelWrap?: boolean
  labelWidth?: number | string
  wrapperWidth?: number | string
  wrapperAlign?: 'left' | 'right'
  wrapperWrap?: boolean
  wrapperStyle?: React.CSSProperties
  help?: string
  hasFeedback?: boolean
  required?: boolean
  noStyle?: boolean
  disabled?: boolean
  hidden?: boolean
  extra?: React.ReactNode
  layout?: 'vertical' | 'horizontal'
  feedbackText?: React.ReactNode
  feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none' | (string & {})
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending' | (string & {})
  feedbackIcon?: React.ReactNode
  size?: 'mini' | 'small' | 'middle' | 'large'
  inset?: boolean
  bordered?: boolean
  tooltipLayout?: 'icon' | 'text'
  tooltip?: React.ReactNode
  tooltipIcon?: React.ReactNode
  asterisk?: boolean
  gridSpan?: number
  __layout__?: boolean
}

type ComposeFormItem = React.FC<IFormItemProps> & {
  BaseItem?: React.FC<IFormItemProps>
}

const useFormItemLayout = (props: IFormItemProps) => {
  const layout = useFormLayout()
  return {
    ...props,
    __layout__: layout.__layout__,
    layout: props.layout ?? layout.layout ?? 'horizontal',
    labelAlign:
      layout.layout === 'vertical'
        ? props.labelAlign ?? layout.labelAlign ?? 'left'
        : props.labelAlign ?? layout.labelAlign ?? 'left',
    labelWrap: props.labelWrap ?? layout.labelWrap,
    labelWidth: props.labelWidth ?? layout.labelWidth,
    wrapperWidth: props.wrapperWidth ?? layout.wrapperWidth,
    wrapperAlign: props.wrapperAlign ?? layout.wrapperAlign,
    wrapperWrap: props.wrapperWrap ?? layout.wrapperWrap,
    size: props.size ?? layout.size,
    inset: props.inset ?? layout.inset,
    bordered: props.bordered ?? layout.bordered,
    feedbackIcon: props.feedbackIcon,
    feedbackLayout: props.feedbackLayout ?? layout.feedbackLayout ?? 'loose',
    tooltipLayout: props.tooltipLayout ?? layout.tooltipLayout ?? 'icon',
    tooltipIcon: props.tooltipIcon ?? layout.tooltipIcon ?? (
      <ExclamationCircleOutline />
    ),
  }
}

function useOverflow<
  Container extends HTMLElement,
  Content extends HTMLElement
>() {
  const [overflow, setOverflow] = useState(false)
  const containerRef = useRef<Container>()
  const contentRef = useRef<Content>()

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const contentWidth = contentRef.current.getBoundingClientRect().width
      const containerWidth = containerRef.current.getBoundingClientRect().width
      if (contentWidth && containerWidth && containerWidth < contentWidth) {
        if (!overflow) setOverflow(true)
      } else {
        if (overflow) setOverflow(false)
      }
    }
  }, [])

  return {
    overflow,
    containerRef,
    contentRef,
  }
}

const ICON_MAP = {
  error: <CloseCircleOutline />,
  success: <CheckCircleOutline />,
  warning: <ExclamationCircleOutline />,
}

export const BaseItem: React.FC<IFormItemProps> = ({ children, ...props }) => {
  const [active, setActive] = useState(false)
  const formLayout = useFormItemLayout(props)

  const { containerRef, contentRef, overflow } = useOverflow<
    HTMLDivElement,
    HTMLLabelElement
  >()
  const {
    label,
    style,
    layout,
    feedbackStatus,
    extra,
    feedbackText,
    feedbackLayout,
    feedbackIcon,
    inset,
    bordered = true,
    labelWidth,
    wrapperWidth,
    labelAlign,
    wrapperAlign = 'left',
    size,
    labelWrap,
    wrapperWrap,
    tooltipLayout,
    tooltip,
    tooltipIcon,
    asterisk,
  } = formLayout
  const labelStyle = { ...formLayout.labelStyle }
  const wrapperStyle = { ...formLayout.wrapperStyle }
  // 固定宽度
  // let enableCol = false
  if (labelWidth || wrapperWidth) {
    if (labelWidth) {
      labelStyle.width = labelWidth === 'auto' ? undefined : labelWidth
      labelStyle.maxWidth = labelWidth === 'auto' ? undefined : labelWidth
    }
    if (wrapperWidth) {
      wrapperStyle.width = wrapperWidth === 'auto' ? undefined : wrapperWidth
      wrapperStyle.maxWidth = wrapperWidth === 'auto' ? undefined : wrapperWidth
    }
    // 栅格模式
  }

  const prefixCls = usePrefixCls('formily-item')
  const formatChildren =
    feedbackLayout === 'popover' ? (
      <Popover
        placement="top"
        content={
          <div
            className={cls({
              [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
              [`${prefixCls}-help`]: true,
            })}
          >
            {ICON_MAP[feedbackStatus]} {feedbackText}
          </div>
        }
        visible={!!feedbackText}
      >
        <>{children}</>
      </Popover>
    ) : (
      children
    )

  const gridStyles: React.CSSProperties = {}

  const getOverflowTooltip = () => {
    if (overflow) {
      return (
        <div>
          <div>{label}</div>
          <div>{tooltip}</div>
        </div>
      )
    }
    return tooltip
  }

  const renderLabelText = () => {
    const labelChildren = (
      <>
        {asterisk && <span className={`${prefixCls}-asterisk`}>{'*'}</span>}
        <div className={`${prefixCls}-label-content`} ref={containerRef}>
          <label ref={contentRef}>{label}</label>
        </div>
      </>
    )

    if ((tooltipLayout === 'text' && tooltip) || overflow) {
      return (
        <Popover placement="top" content={getOverflowTooltip()}>
          {labelChildren}
        </Popover>
      )
    }
    return labelChildren
  }

  const renderTooltipIcon = () => {
    if (tooltip && tooltipLayout === 'icon' && !overflow) {
      return (
        <span className={`${prefixCls}-label-tooltip-icon`}>
          <Popover
            placement="right"
            mode="dark"
            trigger="click"
            content={tooltip}
          >
            <span>{tooltipIcon}</span>
          </Popover>
        </span>
      )
    }
  }

  const renderLabel = () => {
    if (!label) return null
    return (
      <div
        className={cls({
          [`${prefixCls}-label`]: true,
          [`${prefixCls}-label-tooltip`]:
            (tooltip && tooltipLayout === 'text') || overflow,
        })}
        style={labelStyle}
      >
        {renderLabelText()}
        {renderTooltipIcon()}
      </div>
    )
  }

  return (
    <List.Item
      {...pickDataProps(props)}
      style={{
        ...style,
        ...gridStyles,
      }}
      className={cls({
        [`${prefixCls}`]: true,
        [`${prefixCls}-layout-${layout}`]: true,
        [`${prefixCls}-${feedbackStatus}`]: !!feedbackStatus,
        [`${prefixCls}-feedback-has-text`]: !!feedbackText,
        [`${prefixCls}-size-${size}`]: !!size,
        [`${prefixCls}-feedback-layout-${feedbackLayout}`]: !!feedbackLayout,
        [`${prefixCls}-active`]: active,
        [`${prefixCls}-label-align-${labelAlign}`]: true,
        [`${prefixCls}-control-align-${wrapperAlign}`]: true,
        [`${prefixCls}-label-wrap`]: !!labelWrap,
        [`${prefixCls}-control-wrap`]: !!wrapperWrap,
        // [`${prefixCls}-no-form-layout`]: !formLayout.__layout__,
        [`${prefixCls}-bordered-none`]:
          bordered === false || !!inset || !!feedbackIcon,
        [props.className]: !!props.className,
      })}
      title={layout === 'vertical' && renderLabel()}
      prefix={layout === 'horizontal' && renderLabel()}
      extra={extra && <div className={cls(`${prefixCls}-extra`)}>{extra}</div>}
      data-grid-span={props.gridSpan}
    >
      <div
        onFocus={() => {
          if (feedbackIcon) {
            setActive(true)
          }
        }}
        onBlur={() => {
          if (feedbackIcon) {
            setActive(false)
          }
        }}
        className={cls({
          [`${prefixCls}-control`]: true,
        })}
      >
        <div className={cls(`${prefixCls}-control-content`)}>
          <div
            style={wrapperStyle}
            className={cls({
              [`${prefixCls}-control-content-component`]: true,
              [`${prefixCls}-control-content-component-has-feedback-icon`]:
                !!feedbackIcon,
            })}
          >
            <FormLayoutShallowContext.Provider value={undefined}>
              {formatChildren}
            </FormLayoutShallowContext.Provider>
            {feedbackIcon && (
              <div className={cls(`${prefixCls}-feedback-icon`)}>
                {feedbackIcon}
              </div>
            )}
          </div>
        </div>
        {!!feedbackText &&
          feedbackLayout !== 'popover' &&
          feedbackLayout !== 'none' && (
            <div
              className={cls({
                [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
                [`${prefixCls}-help`]: true,
                [`${prefixCls}-help-enter`]: true,
                [`${prefixCls}-help-enter-active`]: true,
              })}
            >
              {feedbackText}
            </div>
          )}
      </div>
    </List.Item>
  )
}

// 适配
export const FormItem: ComposeFormItem = connect(
  BaseItem,
  mapProps((props, field) => {
    if (isVoidField(field))
      return {
        label: field.title || props.label,
        asterisk: props.asterisk,
        extra: props.extra || field.description,
      }
    if (!field) return props
    const takeFeedbackStatus = () => {
      if (field.validating) return 'pending'
      return field.decoratorProps.feedbackStatus || field.validateStatus
    }
    const takeMessage = () => {
      const split = (messages: any[]) => {
        return messages.reduce((buf, text, index) => {
          if (!text) return buf
          return index < messages.length - 1
            ? buf.concat([text, ', '])
            : buf.concat([text])
        }, [])
      }
      if (field.validating) return
      if (props.feedbackText) return props.feedbackText
      if (field.selfErrors.length) return split(field.selfErrors)
      if (field.selfWarnings.length) return split(field.selfWarnings)
      if (field.selfSuccesses.length) return split(field.selfSuccesses)
    }
    const takeAsterisk = () => {
      if (field.required && field.pattern !== 'readPretty') {
        return true
      }
      if ('asterisk' in props) {
        return props.asterisk
      }
      return false
    }
    return {
      label: field.title || props.label,
      feedbackStatus: takeFeedbackStatus(),
      feedbackText: takeMessage(),
      asterisk: takeAsterisk(),
      extra: props.extra || field.description,
    }
  })
)

FormItem.BaseItem = BaseItem

export default FormItem
