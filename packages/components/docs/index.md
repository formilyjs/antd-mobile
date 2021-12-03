---
mobile: false
title: Formily-Alibaba unified front-end form solution
order: 10
hero:
  title: Formily AntdMobile
  desc: Formily Component System Based on Ant Design Mobile Encapsulation
  actions:
    - text: Home Site
      link: //formilyjs.org
    - text: Document
      link: /components
features:
  - icon: https://img.alicdn.com/imgextra/i2/O1CN016i72sH1c5wh1kyy9U_!!6000000003550-55-tps-800-800.svg
    title: Easier To Use
    desc: Out of the box, rich cases
  - icon: https://img.alicdn.com/imgextra/i1/O1CN01bHdrZJ1rEOESvXEi5_!!6000000005599-55-tps-800-800.svg
    title: More Efficient
    desc: Stupid writing, super high performance
  - icon: https://img.alicdn.com/imgextra/i3/O1CN01xlETZk1G0WSQT6Xii_!!6000000000560-55-tps-800-800.svg
    title: More Professional
    desc: complete, flexible, elegant
footer: Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self
---

## Installation

```bash
$ npm install --save antd-mobile
$ npm install --save @formily/core @formily/react @formily/antd-mobile

```

## Quick start

```tsx
/**
 * defaultShowCode: true
 * simulator: false
 */
import React from 'react'
import { NumberPicker, FormItem, Space } from '@formily/antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, Field } from '@formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <Space>
      <Field
        name="price"
        title="价格"
        initialValue={5.2}
        decorator={[
          FormItem,
          {
            bordered: false,
            style: {
              '--prefix-width': 'auto',
            },
          },
        ]}
        component={[
          NumberPicker,
          {
            placeholder: '请输入',
            style: {
              width: 100,
            },
          },
        ]}
      />
      <FormItem bordered={false}>×</FormItem>
      <Field
        name="count"
        title="数量"
        initialValue={100}
        decorator={[
          FormItem,
          {
            bordered: false,
            style: {
              '--prefix-width': 'auto',
            },
          },
        ]}
        component={[
          NumberPicker,
          {
            placeholder: '请输入',
            style: {
              width: 100,
            },
          },
        ]}
      />
      <FormConsumer>
        {(form) => (
          <FormItem bordered={false}>
            ={` ${form.values.price * form.values.count} 元`}
          </FormItem>
        )}
      </FormConsumer>
    </Space>
  </FormProvider>
)
```
