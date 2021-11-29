import { DataField } from '@formily/core'
import { connect, mapProps, observer, useField } from '@formily/react'
import React from 'react'
import { Checkbox as AntdCheckbox, Space } from 'antd-mobile'
import { CheckboxProps, CheckboxGroupProps } from 'antd-mobile/es/components/checkbox'
import { useFormLayout } from '../form-layout'

export interface ICheckboxOption {
  label: string
  value: string
  disabled?: boolean
}

interface Props {
  options?: string[] | ICheckboxOption[]
  layout?: 'vertical' | 'horizontal'
  layoutBlock?: boolean
}

export interface ICheckboxProps extends Props, CheckboxProps {


}

export interface ICheckboxGroupProps extends Props, CheckboxGroupProps {

}

type ComposedCheckbox = React.FC<ICheckboxProps> & {
  Group?: React.FC<ICheckboxGroupProps>
  __ANTD_MOBILE_CHECKBOX?: boolean
}

export const BaseCheckbox: React.FC<ICheckboxProps> = ({children, options, ...props}) => {
  const layout = useFormLayout()
  const field = useField<DataField>()

  const dataSource = field?.dataSource.length
    ? field.dataSource
    : options?.length
      ? options
      : []

  if (children && dataSource.length === 0) {
    return <AntdCheckbox {...props}>{children}</AntdCheckbox>
  }

  return (
    <Space direction={props.layout ?? layout.layout ?? 'vertical'}
           block={props.layoutBlock}
           wrap={true}
    >
      {
        dataSource.map((item) => {
          const option = typeof item === 'string' ? {label: item, value: item} : item
          return <AntdCheckbox {...props} disabled={option.disabled} value={option.value}
                               key={option.value}>{option.label}</AntdCheckbox>
        })
      }
    </Space>
  )
}

BaseCheckbox.defaultProps = {
  block: true,
}

export const CheckboxGroup: React.FC<ICheckboxGroupProps> = observer(({
                                                                        value,
                                                                        defaultValue,
                                                                        disabled,
                                                                        onChange,
                                                                        ...props
                                                                      }) => {

  return (
    <AntdCheckbox.Group
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={onChange}
    >
      <BaseCheckbox {...props} />
    </AntdCheckbox.Group>
  )
})
export const Checkbox: ComposedCheckbox = connect(
  BaseCheckbox,
  mapProps({})
)

Checkbox.__ANTD_MOBILE_CHECKBOX = true
Checkbox.Group = CheckboxGroup

export default Checkbox
