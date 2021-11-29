import React from 'react'
// @ts-ignore
import { Selector, FormLayout, FormItem, FormButtonGroup, Submit } from '@formily/antd-mobile'
import { Dialog, Slider } from 'antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, } from '@formily/react'


const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormLayout,
    Selector,
    Slider
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
const schema = {
  type: 'object',
  properties: {
    layout: {
      type: 'void',
      'x-component': 'FormLayout',
      'x-component-props': {
        layout: 'vertical'
      },
      properties: {
        name: {
          type: 'items',
          title: '单选',
          enum: ItemList,
          'x-decorator': 'FormItem',
          'x-component': 'Selector',
          'x-decorator-props': {
            feedbackLayout: 'popover',
            tooltip: '额外提示',
          },
          'x-component-props': {
            placeholder: '请选择'
          },
          'x-validator': [
            {required: true, message: '必须选择一项'}
          ]
        },
        address: {
          type: 'string',
          title: '多选',
          enum: ItemList,
          default: ['1', '3'],
          'x-decorator': 'FormItem',
          'x-component': 'Selector',
          'x-component-props': {
            placeholder: '请选择',
            multiple: true,
          },
        },
        slider: {
          type: 'string',
          title: '滑动器',
          'x-decorator': 'FormItem',
          'x-component': 'Slider',
          'x-component-props': {
            placeholder: '请选择',
          },
        },
      },
    }
  },
}

export default () => {

  const onSubmit = (values: any) => {
    Dialog.alert({
      content: JSON.stringify(values)
    })
  }

  return (
    <FormProvider form={form}>
      <SchemaField schema={schema}/>
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
