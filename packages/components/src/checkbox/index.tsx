import { DataField } from '@formily/core'
import { connect, mapProps, observer, useField } from '@formily/react'
import React, { FunctionComponent } from 'react'
import { Checkbox as AntdCheckbox, Space } from 'antd-mobile'
import {
  CheckboxProps,
  CheckboxGroupProps,
} from 'antd-mobile/es/components/checkbox'
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

export interface ICheckboxProps extends Props, CheckboxProps {}

export interface ICheckboxGroupProps extends Props, CheckboxGroupProps {}

type ComposedCheckbox = React.FC<ICheckboxProps> & {
  Group?: React.FC<ICheckboxGroupProps>
  __ANTD_MOBILE_CHECKBOX?: boolean
}

const isCheckbox = (node: any) => {
  return (
    React.isValidElement(node) &&
    (node.type as FunctionComponent).displayName.indexOf('Checkbox') > -1
  )
}

export const BaseCheckbox: React.FC<ICheckboxProps> = ({
  children,
  options,
  ...props
}) => {
  const layout = useFormLayout()
  const field = useField<DataField>()

  const dataSource = field?.dataSource?.length
    ? field.dataSource
    : options?.length
    ? options
    : []

  if (children) {
    //线jsx模式
    if (Array.isArray(children)) {
      return <>{children}</>
    }
    return !isCheckbox(children) ? (
      <AntdCheckbox {...props}>{children}</AntdCheckbox>
    ) : (
      (children as any)
    )
  }

  if (dataSource.length === 0) {
    return <AntdCheckbox {...props}>{field?.title || props.value}</AntdCheckbox>
  }

  return (
    <Space
      direction={props.layout ?? layout.layout ?? 'vertical'}
      block={props.layoutBlock}
      wrap={true}
    >
      {dataSource.map((item) => {
        const option =
          typeof item === 'string' ? { label: item, value: item } : item
        return (
          <AntdCheckbox
            {...props}
            disabled={option.disabled}
            value={option.value}
            key={option.value}
          >
            {option.label}
          </AntdCheckbox>
        )
      })}
    </Space>
  )
}

BaseCheckbox.defaultProps = {
  block: true,
}

export const CheckboxGroup: React.FC<ICheckboxGroupProps> = observer(
  ({ value, defaultValue, disabled, onChange, ...props }) => {
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
  }
)
export const Checkbox: ComposedCheckbox = connect(BaseCheckbox, mapProps({}))

Checkbox.displayName = 'Checkbox'
Checkbox.__ANTD_MOBILE_CHECKBOX = true
Checkbox.Group = CheckboxGroup
Checkbox.Group.displayName = 'Checkbox.Group'

export default Checkbox
