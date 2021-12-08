import React from 'react'
import { List, Checkbox } from '@formily/antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <List title="基础">
      <Checkbox>1111</Checkbox>
      <Checkbox>2222</Checkbox>
    </List>
    <List title="多选">
      <Checkbox.Group defaultValue={['B', 'C']}>
        <Checkbox value="A">A</Checkbox>
        <Checkbox value="B">B</Checkbox>
        <Checkbox value="C">C</Checkbox>
      </Checkbox.Group>
    </List>
  </FormProvider>
)
