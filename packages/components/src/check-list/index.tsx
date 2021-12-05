import React from 'react'
import { DataField } from '@formily/core'
import { connect, mapProps, useField } from '@formily/react'
import { CheckList as AntdCheckList } from 'antd-mobile'
import {
  CheckListProps,
  CheckListItemProps,
} from 'antd-mobile/es/components/check-list'
import { IListItemProps } from '../list'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'

export interface ICheckListOption {
  label: string
  value: string
  disabled?: boolean
}

interface Props {
  options?: string[] | ICheckListOption[]
  layout?: 'vertical' | 'horizontal'
  layoutBlock?: boolean
}

export interface ICheckListProps extends Props, CheckListProps {}

export interface ICheckListItemProps
  extends Props,
    CheckListItemProps,
    IListItemProps {}

type ComposedCheckList = React.FC<ICheckListProps> & {
  Item?: React.FC<ICheckListItemProps>
  __ANTD_MOBILE_CHECKLIST?: boolean
}

export const BaseCheckList: React.FC<ICheckListProps> = ({
  className,
  style,
  children,
  options,
  ...props
}) => {
  const prefixCls = usePrefixCls('formily-check-list')
  const field = useField<DataField>()
  const dataSource = field?.dataSource.length
    ? field.dataSource
    : options?.length
    ? options
    : []

  if (children && dataSource.length === 0) {
    // 原生jsx模式
    return <AntdCheckList {...props}>{children}</AntdCheckList>
  }

  return (
    <div className={cls(prefixCls, className)} style={style}>
      <AntdCheckList {...props}>
        {dataSource.map((item) => {
          const option =
            typeof item === 'string' ? { label: item, value: item } : item
          return (
            <AntdCheckList.Item
              {...option}
              disabled={option.disabled}
              value={option.value}
              key={option.value}
            >
              {option.label}
            </AntdCheckList.Item>
          )
        })}
      </AntdCheckList>
    </div>
  )
}

export const CheckList: ComposedCheckList = connect(BaseCheckList, mapProps({}))

CheckList.displayName = 'CheckList'
CheckList.__ANTD_MOBILE_CHECKLIST = true
CheckList.Item = AntdCheckList.Item

export default CheckList
