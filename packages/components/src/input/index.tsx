import React from 'react'
import { connect, mapReadPretty } from '@formily/react'
import { Input as AntdInput, Loading } from 'antd-mobile'
import { InputProps } from 'antd-mobile/es/components/input'
import { PreviewText } from '../preview-text'


export const Input: React.FC<InputProps> = connect(
  AntdInput,
  mapReadPretty(PreviewText.Input)
)

export default Input
