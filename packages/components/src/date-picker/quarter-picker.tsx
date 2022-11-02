import React, { useCallback, useMemo } from 'react'
import { useCreation } from 'ahooks'
import { Picker } from 'antd-mobile'
import { DatePickerProps as AntdDatePickerProps } from 'antd-mobile/es/components/date-picker/date-picker'
import * as quarterUtils from './date-quarter-utils'
import { QuarterPrecision } from './date-quarter-utils'

const thisYear = new Date().getFullYear()

export const QuarterDatePicker: React.FC<AntdDatePickerProps> = (props) => {
  const pickerValue = useMemo(
    () => quarterUtils.convertDateToStringArray(props.value),
    [props.value]
  )

  const columns = useCallback(
    (selected) =>
      quarterUtils.generateDatePickerColumns(
        selected as string[],
        props.min,
        props.max,
        props.precision as QuarterPrecision,
        props.renderLabel,
        props.filter
      ),
    [props.min, props.max, props.precision, props.renderLabel]
  )

  const onConfirm = useCallback((val: string[]) => {
    props.onConfirm?.(quarterUtils.convertStringArrayToDate(val))
  }, [])

  const onSelect = useCreation(
    () => (val: string[]) => {
      const date = quarterUtils.convertStringArrayToDate(val)
      props.onSelect?.(date)
    },
    []
  )

  return (
    <Picker
      columns={columns}
      value={pickerValue}
      onCancel={props.onCancel}
      onClose={props.onClose}
      visible={props.visible}
      confirmText={props.confirmText}
      cancelText={props.cancelText}
      onConfirm={onConfirm}
      onSelect={onSelect}
      getContainer={props.getContainer}
      afterShow={props.afterShow}
      afterClose={props.afterClose}
      onClick={props.onClick}
      title={props.title}
      stopPropagation={props.stopPropagation}
    >
      {(items, actions) =>
        props.children?.(
          items.length === 0
            ? null
            : quarterUtils.convertStringArrayToDate(
                items.map((item) => item?.value)
              ),
          actions
        )
      }
    </Picker>
  )
}

QuarterDatePicker.defaultProps = {
  min: new Date(new Date().setFullYear(thisYear - 10)),
  max: new Date(new Date().setFullYear(thisYear + 10)),
  renderLabel: quarterUtils.defaultRenderLabel,
}

export default QuarterDatePicker
