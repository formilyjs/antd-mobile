import React from 'react'
// @ts-ignore
import {
  CascadePicker,
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Submit,
} from '@formily/antd-mobile'
import { Dialog } from 'antd-mobile'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    CascadePicker,
  },
})

const form = createForm()

export default () => {
  const onSubmit = (values: any) => {
    Dialog.alert({
      content: JSON.stringify(values),
    })
  }

  const options = [
    {
      label: '浙江',
      value: '222',
      children: [
        {
          label: '杭州',
          value: '33',
        },
        {
          label: '宁波',
          value: '44',
        },
      ],
    },
    {
      label: '江苏',
      value: '55',
      children: [
        {
          label: '南京',
          value: '66',
        },
        {
          label: '苏州',
          value: '77',
        },
      ],
    },
  ]

  return (
    <FormProvider form={form}>
      <FormLayout labelAlign="right">
        <SchemaField>
          <SchemaField.String
            name="name"
            title="姓名"
            x-decorator="FormItem"
            x-decorator-props={{
              feedbackLayout: 'popover',
              tooltip: <span>请输入真实姓名</span>,
            }}
            x-validator={[{ required: true, message: '姓名不能为空' }]}
            x-component="Input"
            x-component-props={{
              placeholder: '请输入姓名',
            }}
          />
          <SchemaField.String
            name="address"
            title="地址"
            x-decorator="FormItem"
            x-decorator-props={{
              feedbackLayout: 'terse',
            }}
            x-component="Input"
            x-component-props={{
              placeholder: '请输入地址',
            }}
          />
          <SchemaField.String
            name="city"
            title="城市"
            x-decorator="FormItem"
            x-decorator-props={{
              feedbackLayout: 'terse',
            }}
            x-component="CascadePicker"
            x-component-props={{
              placeholder: '请选择',
              clearable: true,
            }}
            enum={options}
          />
        </SchemaField>
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
