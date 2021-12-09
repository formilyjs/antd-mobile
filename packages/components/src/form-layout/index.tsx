import React, { createContext, useContext } from 'react'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
import { List } from 'antd-mobile'
import { ListProps } from 'antd-mobile/es/components/list'

export interface IFormLayoutProps extends ListProps {
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
  layout?: 'vertical' | 'horizontal'
  labelAlign?: 'right' | 'left' | ('right' | 'left')[]
  wrapperAlign?: 'right' | 'left' | ('right' | 'left')[]
  labelWrap?: boolean
  labelWidth?: number
  wrapperWidth?: number
  wrapperWrap?: boolean
  inset?: boolean
  shallow?: boolean
  bordered?: boolean
  spaceGap?: number
  gridColumnGap?: number
  gridRowGap?: number
  tooltipLayout?: 'icon' | 'text'
  tooltipIcon?: React.ReactNode
  feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none'
  size?: 'mini' | 'small' | 'middle' | 'large'
  __layout__?: boolean
}

export type IFormLayoutContext = IFormLayoutProps
export const FormLayoutDeepContext = createContext<IFormLayoutContext>(null)
export const FormLayoutShallowContext = createContext<IFormLayoutContext>(null)
export const useFormDeepLayout = () => useContext(FormLayoutDeepContext)
export const useFormShallowLayout = () => useContext(FormLayoutShallowContext)
export const useFormLayout = () => ({
  ...useFormDeepLayout(),
  ...useFormShallowLayout(),
})

export const FormLayout: React.FC<IFormLayoutProps> & {
  useFormLayout: () => IFormLayoutContext
  useFormDeepLayout: () => IFormLayoutContext
  useFormShallowLayout: () => IFormLayoutContext
} = ({ shallow, children, prefixCls, className, style, ...props }) => {
  const deepLayout = useFormDeepLayout()
  const formPrefixCls = usePrefixCls('form', { prefixCls })
  const layoutPrefixCls = usePrefixCls('formily-layout', { prefixCls })
  const layoutClassName = cls(
    layoutPrefixCls,
    {
      [`${formPrefixCls}-${props.layout}`]: true,
      [`${formPrefixCls}-${props.size}`]: props.size,
    },
    className
  )
  const renderChildren = () => {
    const newDeepLayout = {
      ...deepLayout,
      __layout__: true,
    }
    if (!shallow) {
      Object.assign(newDeepLayout, props)
    } else {
      if (props.size) {
        newDeepLayout.size = props.size
      }
    }
    return (
      <FormLayoutDeepContext.Provider value={newDeepLayout}>
        <FormLayoutShallowContext.Provider value={shallow ? props : undefined}>
          {children}
        </FormLayoutShallowContext.Provider>
      </FormLayoutDeepContext.Provider>
    )
  }

  return (
    <List className={layoutClassName} style={style} mode={props.mode}>
      {renderChildren()}
    </List>
  )
}

FormLayout.defaultProps = {
  shallow: true,
}

FormLayout.useFormDeepLayout = useFormDeepLayout
FormLayout.useFormShallowLayout = useFormShallowLayout
FormLayout.useFormLayout = useFormLayout

export default FormLayout
