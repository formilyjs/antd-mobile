import React from 'react'
// @ts-ignore
import {
  CascadePicker,
  FormLayout,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/antd-mobile'
import { Dialog, Slider } from 'antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { options } from './data'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormLayout,
    CascadePicker,
    Slider,
  },
})

const form = createForm()
const schema = {
  type: 'object',
  properties: {
    layout: {
      type: 'void',
      'x-component': 'FormLayout',
      'x-component-props': {
        layout: 'vertical',
      },
      properties: {
        name: {
          type: 'items',
          title: '城市',
          enum: options,
          'x-decorator': 'FormItem',
          'x-component': 'CascadePicker',
          'x-component-props': {
            placeholder: '请选择',
          },
          'x-validator': [{ required: true, message: '必须选择一项' }],
        },
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
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
