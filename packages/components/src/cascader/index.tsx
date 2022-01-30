import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Cascader as AntCascader } from 'antd-mobile'
import PreviewText from '../preview-text'

export const Cascader = connect(
  AntCascader,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty(PreviewText.Cascader)
)

export default Cascader
