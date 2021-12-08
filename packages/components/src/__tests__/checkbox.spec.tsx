import React from 'react'
import { render } from '@testing-library/react'
import { createForm } from '@formily/core'
import { FormProvider, Field, createSchemaField } from '@formily/react'
import { Checkbox } from '../checkbox'

const Decorator: React.FC = (props) => <div>{props.children}</div>

test('basic: check and uncheck', () => {
  const { debug, queryAllByRole, queryByText } = render(
    <div>
      <Checkbox>checkbox</Checkbox>
      <Checkbox.Group>
        <Checkbox>checkbox-group</Checkbox>
      </Checkbox.Group>
    </div>
  )
  // debug()
  const checkboxs = queryAllByRole('checkbox')

  const checkbox = checkboxs?.[0] as HTMLInputElement
  const checkboxGroup = checkboxs?.[1] as HTMLInputElement

  // check
  queryByText('checkbox')?.click()
  queryByText('checkbox-group')?.click()
  expect(checkbox?.checked).toBeTruthy()
  expect(checkboxGroup?.checked).toBeTruthy()

  // uncheck
  queryByText('checkbox')?.click()
  queryByText('checkbox-group')?.click()
  expect(checkbox?.checked).toBeFalsy()
  expect(checkboxGroup?.checked).toBeFalsy()
})

test('basic-markup-schema: check and uncheck', () => {
  const form = createForm()
  const { debug, queryAllByRole, queryByText } = render(
    <FormProvider form={form}>
      <Field
        decorator={[Decorator]}
        component={[Checkbox]}
        title="checkbox"
        name="test"
      />
      <Field
        decorator={[Decorator]}
        component={[Checkbox.Group]}
        dataSource={[
          { label: '111', value: 1 },
          { label: '222', value: 2 },
          { label: '333', value: 3 },
        ]}
        title="checkbox-group"
        name="test-group"
      />
    </FormProvider>
  )
  // debug()
  const checkbox = queryAllByRole('checkbox')?.[0] as HTMLInputElement
  // check
  queryByText('checkbox')?.click()
  queryByText('222')?.click()
  expect(checkbox.checked).toBeTruthy()
  expect(form.getValuesIn('test')).toBeTruthy()
  expect(form.getValuesIn('test-group')).toStrictEqual([2])
  // uncheck
  queryByText('checkbox')?.click()
  queryByText('222')?.click()
  queryByText('111')?.click()
  expect(checkbox.checked).toBeFalsy()
  expect(form.getValuesIn('test')).toBeFalsy()
  expect(form.values).toStrictEqual({
    test: false,
    'test-group': [1],
  })
})

test('basic-json-schema:  check and uncheck ', () => {})
