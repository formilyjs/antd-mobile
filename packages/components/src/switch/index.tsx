import { Switch as AntdSwitch } from 'antd-mobile'
import { connect, mapProps } from '@formily/react'
import { isNum } from '@formily/shared'

export const Switch = connect(
  AntdSwitch,
  mapProps(
    {
      value: 'checked',
    },
    (props) => {
      const onChange = props.onChange
      props.checked = isNum(props.checked) ? props.checked === 1 : props.checked

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
