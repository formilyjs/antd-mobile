import React from 'react'
import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { DatePicker as AntdDatePicker } from 'antd-mobile'
import { DatePickerProps as AntdDatePickerProps } from 'antd-mobile/es/components/date-picker'
import { PreviewText } from '../preview-text'
import { formatMomentValue, momentable } from '../__builtins__'

type DateValue = string | Date | moment.Moment | moment.Moment[]

type PickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year'

export type DatePickerProps<PickerProps> = Exclude<
  PickerProps,
  'value' | 'onChange'
> & {
  picker?: PickerMode
  format?:
    | string
    | ((value: moment.Moment) => string)
    | (string | ((value: moment.Moment) => string)[])
  showTime?: boolean
  value: DateValue
  onChange: (value: DateValue) => void
}

export type RangePickerProps = {}

type ComposedDatePicker = React.FC<AntdDatePickerProps> & {
  RangePicker?: React.FC<RangePickerProps>
}

const mapDateFormat = function () {
  const getDefaultFormat = (props: DatePickerProps<AntdDatePickerProps>) => {
    const picker = props.picker
    if (picker === 'month') {
      return 'YYYY-MM'
    } else if (picker === 'quarter') {
      return 'YYYY-\\QQ'
    } else if (picker === 'year') {
      return 'YYYY'
    } else if (picker === 'week') {
      return 'gggg-wo'
    }
    return props['showTime'] ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }
  return (props: any) => {
    const format = props['format'] || getDefaultFormat(props)
    const onChange = props.onChange
    return {
      ...props,
      format: format,
      value: momentable(props.value, format === 'gggg-wo' ? 'gggg-ww' : format),
      onChange: (value: DateValue) => {
        if (onChange) {
          onChange(formatMomentValue(value, format))
        }
      },
    }
  }
}

export const DatePicker: ComposedDatePicker = connect(
  AntdDatePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.DatePicker)
)

/*
 DatePicker.RangePicker = connect(
 AntdDatePicker.RangePicker,
 mapProps(mapDateFormat()),
 mapReadPretty(PreviewText.DateRangePicker)
 )
 */

export default DatePicker
