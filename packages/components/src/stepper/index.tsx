import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { isFn, isValid } from '@formily/shared'
import { Stepper as AntdStepper } from 'antd-mobile'
import { StepperProps } from 'antd-mobile/es/components/stepper'
import { PreviewText } from '../preview-text'

interface INumberProps<T extends number | string> {
  precision?: number
  parser?: (displayValue: string | undefined) => T;
  formatter?: (value: T | undefined) => string;
}


export const Stepper: React.FC<StepperProps> = connect(
  AntdStepper,
  mapReadPretty(PreviewText.Input)
)

function formatValue(v: string | number, digits?: number): number {
  let value = Number(v)
  if (isValid(digits)) {
    value = parseFloat(value.toFixed(digits))
  }
  return value
}

export const InputNumber: React.FC<StepperProps> = connect(AntdStepper,
  mapProps(
    (props: INumberProps<any> & StepperProps) => {
      const onChange = props.onChange
      const parser = props.parser
      const digits = isValid(props.digits) ? props.digits : props.precision
      return {
        value: parser ? formatValue(parser(props?.value.toString())) : props.value,
        digits: digits,
        onChange(value) {
          let val: number | string = value
          if (isFn(props.formatter)) {
            val = props.formatter(value)
          }
          val = formatValue(val)
          onChange?.(val)
        }
      }
    }
  ),
  mapReadPretty(PreviewText.Input)
)

export const NumberPicker = InputNumber

export default Stepper
