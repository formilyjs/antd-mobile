import React from 'react'
import JsonSchema from './json-schema'
import MarkupSchema from './markup-schema'
import JSX from './jsx'
import { List } from 'antd-mobile'

function Index(props) {
  return (
    <>
      <List header="Markup Schema 模式">
        <MarkupSchema />
      </List>

      <List header="JSON Schema 模式">
        <JsonSchema />
      </List>
      <List header="原生JSX 模式">
        <JSX />
      </List>
    </>
  )
}

export default Index
