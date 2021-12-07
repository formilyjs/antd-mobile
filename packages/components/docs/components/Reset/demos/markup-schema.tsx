import React, { useMemo } from 'react'
// @ts-ignore
import {
  Reset,
  Input,
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
  },
})

//有默认值的控件无法被清空

export const Demo1 = () => {
  const form = useMemo(() => createForm(), [])

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
            name="input"
            title="输入框"
            required
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="input2"
            title="输入框"
            default="123"
            required
            x-decorator="FormItem"
            x-component="Input.TextArea"
          />
        </SchemaField>
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}

//强制清空重置

export const Demo2 = () => {
  const form = useMemo(() => createForm(), [])

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
            name="input"
            title="输入框"
            required
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="input2"
            title="输入框"
            default="123"
            required
            x-decorator="FormItem"
            x-component="Input.TextArea"
          />
        </SchemaField>
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
        <Reset forceClear>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}

//重置并校验

export const Demo3 = () => {
  const form = useMemo(() => createForm(), [])

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
            name="input"
            title="输入框"
            required
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="input2"
            title="输入框"
            default="123"
            required
            x-decorator="FormItem"
            x-component="Input"
          />
        </SchemaField>
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
        <Reset validate>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}

//强制清空重置并校验

export const Demo4 = () => {
  const form = useMemo(() => createForm(), [])

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
            name="input"
            title="输入框"
            required
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaField.String
            name="input2"
            title="输入框"
            default="123"
            required
            x-decorator="FormItem"
            x-component="Input"
          />
        </SchemaField>
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
        <Reset forceClear validate>
          重置
        </Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
