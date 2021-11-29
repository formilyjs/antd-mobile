import React from 'react'
// @ts-ignore
import { FormLayout, FormItem, Selector, FormButtonGroup, Submit, } from '@formily/antd-mobile'
import { Dialog } from 'antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Selector
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
          <SchemaField.String
            name="items"
            title="单选"
            x-decorator="FormItem"
            x-component="Selector"
            x-component-props={{
              placeholder: '请选择',
            }}
            enum={ItemList}
          />
          <SchemaField.String
            name="items-multiple"
            title="多选"
            x-decorator="FormItem"
            x-component="Selector"
            x-component-props={{
              placeholder: '请选择',
              multiple: true,
            }}
            default={['1', '4']}
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
