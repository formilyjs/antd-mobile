import { IBuilderConfig } from '@formily/template'

export const BuilderConfig: IBuilderConfig = {
  targetLibName: 'antd-mobile',
  targetLibCjsDir: 'lib',
  targetLibEsDir: 'es',
  externals: {
    'antd-mobile': 'antdMobile',
  },
}
