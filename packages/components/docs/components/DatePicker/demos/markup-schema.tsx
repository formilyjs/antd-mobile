// @ts-ignore
import {
  DatePicker,
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Submit,
} from '@formily/antd-mobile'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/react'
import { Dialog } from 'antd-mobile'
import React from 'react'

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
          =
          <SchemaField.String
            name="date"
            required
            title="普通日期"
            x-decorator="FormItem"
            x-component="DatePicker"
          />
          <SchemaField.String
            name="week"
            title="周选择"
            x-decorator="FormItem"
            x-component="DatePicker"
            x-component-props={{
              picker: 'week',
            }}
          />
          <SchemaField.String
            name="month"
            title="月选择"
            x-decorator="FormItem"
            x-component="DatePicker"
            x-component-props={{
              picker: 'month',
            }}
          />
          <SchemaField.String
            name="quarter"
            title="财年选择"
            x-decorator="FormItem"
            x-component="DatePicker"
            x-component-props={{
              picker: 'quarter',
              clearable: true,
            }}
          />
          <SchemaField.String
            name="year"
            title="年选择"
            x-decorator="FormItem"
            x-component="DatePicker"
            x-component-props={{
              picker: 'year',
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
