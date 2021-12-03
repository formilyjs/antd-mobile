import React from 'react'
import { Input, FormLayout, FormItem, NumberPicker } from '@formily/antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    NumberPicker,
  },
})

const form = createForm()
const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'number',
      title: '数量',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {},
    },
    textarea: {
      type: 'number',
      title: '单价',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {},
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <FormLayout>
      <SchemaField schema={schema} />
    </FormLayout>
  </FormProvider>
)
