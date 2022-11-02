import { useCallback, useRef, useState } from 'react'

export interface Options<T> {
  value?: T
  defaultValue: T
  onChange?: (v: T, ...args: any) => void
}

export const usePropsValue = <T extends any>(options: Options<T>) => {
  const { value, defaultValue, onChange: onPropChange } = options
  const [current, setValue] = useState(defaultValue ?? value)
  const valueRef = useRef<T>(current)

  const onChange = useCallback(
    (value, ...args: any) => {
      if (value !== valueRef.current) {
        valueRef.current = value
        setValue(value)
        onPropChange?.(value, ...args)
      }
    },
    [onPropChange]
  )

  return [valueRef.current, onChange] as [T, typeof onChange]
}
