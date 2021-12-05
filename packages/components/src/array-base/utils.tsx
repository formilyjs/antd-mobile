import React from 'react'
import { ISchema, RecursionField, Schema } from '@formily/react'

export const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

export const isIndexComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Index') > -1
}

export const isRemoveComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Remove') > -1
}

export const isMoveUpComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveUp') > -1
}

export const isMoveDownComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveDown') > -1
}

export const isArrayItemComponent = (
  schema: ISchema,
  componentName: string | string[]
) => {
  const names = Array.isArray(componentName) ? componentName : [componentName]
  return names.some((name) => schema['x-component']?.indexOf(name) > -1)
}

export const isOperationComponent = (schema: ISchema) => {
  return (
    isAdditionComponent(schema) ||
    isRemoveComponent(schema) ||
    isMoveDownComponent(schema) ||
    isMoveUpComponent(schema)
  )
}

export const useArrayItemComponent = (
  schema: Schema,
  name: string | string[]
) => {
  const names = Array.isArray(name) ? name : [name]
  const result = new Map()
  return schema?.reduceProperties((res, sc, key) => {
    names.forEach((n) => {
      if (isArrayItemComponent(sc, n) && !res.has(n)) {
        res.set(
          n,
          <RecursionField name={key} schema={sc} onlyRenderProperties />
        )
      }
    })
    return res
  }, result)
}
