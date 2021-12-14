import { Field } from '@formily/core'
import { observer, useField } from '@formily/react'
import { isArr, isValid } from '@formily/shared'
import { Tag } from 'antd-mobile'
import { InputProps } from 'antd-mobile/es/components/input'
import { SelectorProps } from 'antd-mobile/es/components/selector'
import cls from 'classnames'
import React, { createContext, useContext } from 'react'
import { formatMomentValue, usePrefixCls } from '../__builtins__'
import { IDatePickerProps } from '../date-picker'

interface IPreviewTextProps {
  prefixCls?: string
}

const PlaceholderContext = createContext<React.ReactNode>('N/A')

const Placeholder = PlaceholderContext.Provider

const usePlaceholder = (value?: any) => {
  const placeholder = useContext(PlaceholderContext) || 'N/A'
  return isValid(value) && value !== '' ? value : placeholder
}

const Input: React.FC<InputProps & IPreviewTextProps> = ({
  className,
  ...props
}) => {
  const prefixCls = usePrefixCls('form-text', props)
  return (
    <div className={cls(prefixCls, className)}>
      {usePlaceholder(props.value)}
    </div>
  )
}

const Text = (props: React.PropsWithChildren<any>) => {
  const prefixCls = usePrefixCls('form-text', props)

  return (
    <div className={cls(prefixCls, props.className)} style={props.style}>
      {usePlaceholder(props.value)}
    </div>
  )
}

const Selector: React.FC<SelectorProps<any> & IPreviewTextProps> = observer(
  (props) => {
    const field = useField<Field>()
    const prefixCls = usePrefixCls('form-text', props)
    const dataSource: any[] = field?.dataSource?.length
      ? field.dataSource
      : props?.options?.length
      ? props.options
      : []
    const placeholder = usePlaceholder()
    const getSelected = () => {
      return props.value || []
    }

    const getLabel = (target: any) => {
      return (
        dataSource?.find((item) => item.value == target)?.label || placeholder
      )
    }

    const getLabels = () => {
      const selected = getSelected()
      if (!selected.length) return placeholder
      if (selected.length === 1) return getLabel(selected[0])
      return selected.map((item, key) => {
        return (
          <Tag key={key} fill="outline">
            {getLabel(item)}
          </Tag>
        )
      })
    }
    return (
      <div className={cls(prefixCls, props.className)} style={props.style}>
        {getLabels()}
      </div>
    )
  }
)

const DatePicker: React.FC<IDatePickerProps<any> & IPreviewTextProps> = (
  props
) => {
  const placeholder = usePlaceholder()
  const prefixCls = usePrefixCls('form-text', props)
  const getLabels = () => {
    const labels = formatMomentValue(props.value, props.format, placeholder)
    return isArr(labels) ? labels.join('~') : labels
  }
  return <div className={cls(prefixCls, props.className)}>{getLabels()}</div>
}

Text.Input = Input
Text.Selector = Selector
Text.Placeholder = Placeholder
Text.DatePicker = DatePicker
Text.usePlaceholder = usePlaceholder

export const PreviewText = Text

export default PreviewText
