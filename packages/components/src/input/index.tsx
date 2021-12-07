import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Input as AntdInput, TextArea as AntdTextArea } from 'antd-mobile'
import { isValid } from '@formily/shared'
import { InputProps } from 'antd-mobile/es/components/input'
import { TextAreaProps } from 'antd-mobile/es/components/text-area'
import { PreviewText } from '../preview-text'

type ComposedInput = React.FC<InputProps> & {
  TextArea?: React.FC<TextAreaProps>
}

export const Input: ComposedInput = connect(
  AntdInput,
  mapProps((props) => {
    return {
      value: isValid(props.value) ? props.value : '',
    }
  }),
  mapReadPretty(PreviewText.Input)
)

Input.TextArea = connect(
  AntdTextArea,
  mapProps((props) => {
    return {
      value: isValid(props.value) ? props.value : '',
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export default Input
