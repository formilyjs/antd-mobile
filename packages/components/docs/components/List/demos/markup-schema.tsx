import {
  PayCircleOutline,
  SetOutline,
  UnorderedListOutline,
} from 'antd-mobile-icons'
import React from 'react'
// @ts-ignore
import {
  List,
  FormLayout,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/antd-mobile'
import { Dialog, Image } from 'antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const icons = {
  bill: <UnorderedListOutline />,
  assets: <PayCircleOutline />,
  setting: <SetOutline />,
}
const SchemaField = createSchemaField({
  scope: { icons },
  components: {
    List,
    FormItem,
    Image,
  },
})

const form = createForm()

const listData = [
  { icon: 'bill', title: '账单' },
  { icon: 'assets', title: '总资产' },
  { icon: 'setting', title: '设置' },
]

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
          <SchemaField.Array x-component="List" default={listData}>
            <SchemaField.Object
              x-component="List.Item"
              x-component-props={{
                clickable: true,
                children: '{{$record.title}}',
              }}
            >
              <SchemaField.Void x-component="List.ItemPrefix">
                <SchemaField.Void
                  type="string"
                  x-content={'{{icons[$record.icon]}}'}
                />
              </SchemaField.Void>
            </SchemaField.Object>
          </SchemaField.Array>
        </SchemaField>
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
