import React from 'react'
// @ts-ignore
import {
  Input,
  DatePicker,
  FormLayout,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/antd-mobile'
import { Dialog } from 'antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    DatePicker,
  },
})

const form = createForm()
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '姓名',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        feedbackLayout: 'popover',
        tooltip: '请输入真实姓名',
      },
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入姓名',
      },
      'x-validator': [{ required: true, message: '姓名不能为空' }],
    },
    address: {
      type: 'string',
      title: '日期',
      default: '2021-12-1',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        placeholder: '请选择',
        clearable: true,
      },
    },
  },
}

export default () => {
  const onSubmit = (values: any) => {
    Dialog.alert({
      content: JSON.stringify(values),
    })
  }

  return (
    <FormProvider form={form}>
      <FormLayout>
        <SchemaField schema={schema} />
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
