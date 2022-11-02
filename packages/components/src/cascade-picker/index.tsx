import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { CascadePickerProps as AntCascadePickerProps } from 'antd-mobile/es/components/cascade-picker'
import { VirtualInputRef } from 'antd-mobile/es/components/virtual-input'
import {
  PickerColumnItem,
  PickerValue,
  PickerValueExtend,
} from 'antd-mobile/es/components/picker'
import { CascadePicker as AntCascadePicker, VirtualInput } from 'antd-mobile'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { usePrefixCls, usePropsValue } from '../__builtins__'
import cls from 'classnames'
import { CloseCircleFill } from 'antd-mobile-icons'
import PreviewText from '../preview-text'

export interface ICascadePickerProps extends AntCascadePickerProps {
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  onChange?: (value: PickerValue[], extend: PickerValueExtend) => void
  clearable?: boolean
  displayRender?: (
    label: ReactNode[],
    selectedOptions: (PickerColumnItem | null)[]
  ) => string
}

const defaultDisplayRender = (
  label: ReactNode[]
  // selectedOptions: (PickerColumnItem | null)[]
) => label?.join(' / ')

export const BasePicker: React.FC<ICascadePickerProps> = ({
  placeholder,
  className,
  displayRender = defaultDisplayRender,
  value: propValue,
  onChange: propOnChange,
  clearable,
  style,
  ...props
}) => {
  const prefix = usePrefixCls('formily-cascade-picker')
  const inputRef = useRef<VirtualInputRef>()
  const labelItems = useRef<PickerColumnItem[]>([])
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState<string | undefined>()
  const [value, onChange] = usePropsValue({
    defaultValue: propValue,
    onChange: propOnChange,
  })

  useEffect(() => {
    setLabel(
      displayRender(
        labelItems.current.map((item) => item.label),
        labelItems.current
      )
    )
  }, [labelItems.current])

  const renderPicker = () => {
    const pickerProps = {
      getContainer: null,
      ...props,
      visible,
      value,
      onClose: () => {
        setVisible(false)
        inputRef.current.focus()
      },
      onConfirm: onChange,
      children: (items) => {
        labelItems.current = items
        return null
      },
    }
    return <AntCascadePicker {...pickerProps} />
  }

  return (
    <div className={cls(prefix, className)}>
      <VirtualInput
        placeholder={placeholder}
        value={label}
        ref={inputRef}
        style={{ '--caret-width': '1px', '--caret-color': '#666666', ...style }}
        onClick={() => {
          setVisible(true)
        }}
      />
      {clearable && value && value.length > 0 && (
        <div
          className={`${prefix}-clear`}
          onClick={() => {
            onChange?.([], { items: [], columns: [] })
            labelItems.current = []
          }}
        >
          <CloseCircleFill />
        </div>
      )}
      {renderPicker()}
    </div>
  )
}

export const CascadePicker = connect(
  BasePicker,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty(PreviewText.Cascader)
)

export default CascadePicker
