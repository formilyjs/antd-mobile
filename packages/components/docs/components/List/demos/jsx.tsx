import React from 'react'
import { List } from '@formily/antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <List title="列表表头">
      <List.Item
        key="1"
        extra="次要信息"
        title="这里是标题"
        description="这里是描述信息"
        clickable
      >
        这里是主信息
      </List.Item>
      <List.Item key="2" title="这里是标题" clickable>
        这里是主信息
      </List.Item>
      <List.Item key="3" title="这里是标题">
        这里是主信息
      </List.Item>
    </List>
  </FormProvider>
)
