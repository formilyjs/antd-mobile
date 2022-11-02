import React from 'react'
import { List, CascadePicker } from '@formily/antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider } from '@formily/react'
import { options } from './data'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <List title="基础">
      <List.Item title={'城市'}>
        <CascadePicker
          placeholder={'请选择'}
          options={options}
          clearable={true}
        />
      </List.Item>
    </List>
  </FormProvider>
)
