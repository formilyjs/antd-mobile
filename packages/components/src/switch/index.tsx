import { Switch as AntdSwitch } from 'antd-mobile'
import { connect, mapProps } from '@formily/react'

export const Switch = connect(
  AntdSwitch,
  mapProps(
    {
      value: 'checked',
    },
    (props) => {
      const onChange = props.onChange
      delete props['value']
      return {
        ...props,
        onChange(checked) {
          onChange?.(checked)
        },
      }
    }
  )
)

export default Switch
