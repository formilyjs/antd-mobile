import React, { useState } from 'react'
// @ts-ignore
import {
  Input,
  FormLayout,
  FormItem,
  FormButtonGroup,
  Submit,
} from '@formily/antd-mobile'
import { Dialog, Switch } from 'antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, observer } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '姓名',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        feedbackLayout: 'popover',
        tooltip: '请输入真实姓名',
      },
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入姓名',
      },
      'x-validator': [{ required: true, message: '姓名不能为空' }],
    },
    address: {
      type: 'string',
      title: '地址',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '请输入地址',
      },
    },
  },
}

export default observer(() => {
  const [checked, setChecked] = useState(true)
  const onSubmit = (values: any) => {
    Dialog.alert({
      content: JSON.stringify(values),
    })
  }

  const onChange = (checked) => {
    setChecked(checked)
    form.setPattern(checked ? 'editable' : 'readPretty')
  }

  return (
    <FormProvider form={form}>
      <FormButtonGroup justify={'start'} align={'center'}>
        <label>表单编辑状态</label>{' '}
        <Switch checked={checked} onChange={onChange} />
      </FormButtonGroup>
      <FormLayout>
        <SchemaField schema={schema} />
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
})
