import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Input as AntdInput } from 'antd-mobile'
import { isValid } from '@formily/shared'
import { InputProps } from 'antd-mobile/es/components/input'
import { PreviewText } from '../preview-text'

export const Input: React.FC<InputProps> = connect(
  AntdInput,
  mapProps((props) => {
    return {
      value: isValid(props.value) ? props.value : '',
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export default Input
