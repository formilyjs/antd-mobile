import React from 'react'
// @ts-ignore
import {
  FormLayout,
  Input,
  FormItem,
  Checkbox,
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
    Checkbox,
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
            title="基本用法"
            x-decorator="FormItem"
            x-component="Checkbox"
            x-component-props={{
              block: true,
            }}
            enum={ItemList}
          />
          <SchemaField.Array
            name="items-multiple"
            title="选项组"
            x-decorator="FormItem"
            x-component="Checkbox.Group"
            x-component-props={{
              layout: 'horizontal',
            }}
            default={['1', '4']}
            enum={ItemList}
          />
          <SchemaField.Array
            name="items-blocks"
            title="块级布局"
            x-decorator="FormItem"
            x-component="Checkbox.Group"
            x-component-props={{
              layoutBlock: true,
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
