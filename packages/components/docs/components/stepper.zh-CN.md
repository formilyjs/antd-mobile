# Stepper

> 步进器

## Markup Schema 案例

```tsx
import React from 'react'
import { Input, Stepper, NumberPicker, FormLayout, FormItem, FormButtonGroup, Submit } from '@formily/antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, } from '@formily/react'


const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Stepper,
    NumberPicker,
  },
})

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <FormLayout>
      <SchemaField>
        <SchemaField.String
          name="input"
          title="输入框"
          x-decorator="FormItem"
          x-decorator-props={{}}
          x-component="Input"
          required
          x-component-props={{}}
        />
        <SchemaField.String
          name="count"
          title="数量"
          x-decorator="FormItem"
          x-decorator-props={{}}
          required
          x-component="NumberPicker"
          x-component-props={{}}
        />
        <SchemaField.String
          name="step"
          title="步进器"
          x-decorator="FormItem"
          x-decorator-props={{}}
          required
          x-component="Stepper"
          x-component-props={{}}
        />
      </SchemaField>
    </FormLayout>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```

## JSON Schema 案例

```tsx
import React from 'react'
import { Input, FormLayout, FormItem, FormButtonGroup, Submit } from '@formily/antd-mobile'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, } from '@formily/react'


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
    input: {
      type: 'string',
      title: '输入框',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {},
    },
    textarea: {
      type: 'string',
      title: '输入框',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {},
    },
  },
}

export default () => (
  <FormProvider form={form}>
    <FormLayout>
      <SchemaField schema={schema}/>
    </FormLayout>
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
)
```
