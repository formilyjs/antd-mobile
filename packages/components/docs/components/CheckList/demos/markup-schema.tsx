import React from 'react'
// @ts-ignore
import {
  FormLayout,
  Input,
  FormItem,
  CheckList,
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
    CheckList,
  },
})

const ItemList = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
    disabled: true,
  },
  {
    label: '选项三',
    value: '3',
  },
  {
    label: '选项四',
    value: '4',
  },
]

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
          <SchemaField.Array
            name="sex"
            title="单选"
            x-decorator="FormItem"
            x-component="CheckList"
            x-component-props={{
              placeholder: '请选择',
            }}
            enum={[
              { label: '男', value: 1 },
              { label: '女', value: 2 },
            ]}
          />
          <SchemaField.Array
            name="items"
            title="多选"
            x-decorator="FormItem"
            x-component="CheckList"
            x-component-props={{
              placeholder: '请选择',
              multiple: true,
            }}
            enum={ItemList}
          />
        </SchemaField>
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
