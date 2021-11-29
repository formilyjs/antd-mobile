const defaultAntdMobilePrefix = 'adm'

export const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) {
    return customizePrefixCls
  }
  return suffixCls ? `${defaultAntdMobilePrefix}-`.concat(suffixCls) : defaultAntdMobilePrefix
}

export const usePrefixCls = (
  tag?: string,
  props?: {
    prefixCls?: string
  }
) => {
  return getPrefixCls(tag, props?.prefixCls)
}
