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

export default () => {
  const onSubmit = (values: any) => {
    Dialog.alert({
      content: JSON.stringify(values),
    })
  }

  return (
    <FormProvider form={form}>
      <FormLayout>
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
            name="birthday"
            title="生日"
            default={new Date()}
            x-decorator="FormItem"
            x-decorator-props={{
              feedbackLayout: 'terse',
            }}
            x-component="DatePicker"
            x-component-props={{
              placeholder: '请选择',
              format: 'YYYY-MM-DD',
              clearable: true,
            }}
          />
        </SchemaField>
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
