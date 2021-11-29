import React from 'react'
import JsonSchema from './json-schema'
import MarkupSchema from './markup-schema'
// @ts-ignore
import { DemoBlock } from 'demos'

function Index(props) {
  return (
    <>
      <DemoBlock title="Markup Schema 模式" style={{ padding: 0 }}>
        <MarkupSchema />
      </DemoBlock>

      <DemoBlock title="JSON Schema 模式" style={{ padding: 0 }}>
        <JsonSchema />
      </DemoBlock>
    </>
  )
}

export default Index
