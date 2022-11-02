import React from 'react'
// @ts-ignore
import {
  FormLayout,
  Input,
  FormItem,
  CascadePicker,
  FormButtonGroup,
  Submit,
} from '@formily/antd-mobile'
import { Dialog } from 'antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { options } from './data'

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

  return (
    <FormProvider form={form}>
      <FormLayout layout="vertical">
        <SchemaField>
          <SchemaField.String
            name="items"
            title="城市"
            x-decorator="FormItem"
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
