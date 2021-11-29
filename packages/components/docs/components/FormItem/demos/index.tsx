import React from 'react'
import JsonSchema from './json-schema'
import MarkupSchema from './markup-schema'
import JSX from './jsx'
// @ts-ignore
import { DemoBlock } from 'demos'

function Index(props) {
  return (
    <>
      <DemoBlock title="Markup Schema 模式" style={{padding: 0}}>
        <MarkupSchema/>
      </DemoBlock>

      <DemoBlock title="JSON Schema 模式" style={{padding: 0}}>
        <JsonSchema/>
      </DemoBlock>
      <DemoBlock title="原生JSX 模式" style={{padding: 0}}>
        <JSX/>
      </DemoBlock>
    </>
  )
}

export default Index
