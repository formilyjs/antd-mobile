import React from 'react'
import { List, CheckList } from '@formily/antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider } from '@formily/react'
import { SmileOutline } from 'antd-mobile-icons'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <List title="自定义选中图标">
      <CheckList activeIcon={<SmileOutline />} defaultValue={['B']}>
        <CheckList.Item value="A">A</CheckList.Item>
        <CheckList.Item value="B">B</CheckList.Item>
        <CheckList.Item value="C">C</CheckList.Item>
      </CheckList>
    </List>
    <List title="多选">
      <CheckList multiple defaultValue={['B', 'C']}>
        <CheckList.Item value="A">A</CheckList.Item>
        <CheckList.Item value="B">B</CheckList.Item>
        <CheckList.Item value="C">C</CheckList.Item>
      </CheckList>
    </List>
  </FormProvider>
)
