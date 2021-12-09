import React from 'react'
import JsonSchema from './json-schema'
import MarkupSchema from './markup-schema'
import { List } from '@formily/antd-mobile'

function Index(props) {
  return (
    <>
      <List renderHeader="Markup Schema 模式">
        <MarkupSchema />
      </List>

      <List renderHeader="JSON Schema 模式">
        <JsonSchema />
      </List>
    </>
  )
}

export default Index
