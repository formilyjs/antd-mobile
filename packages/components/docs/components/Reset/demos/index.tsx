import React from 'react'
import { Demo1, Demo2, Demo3, Demo4 } from './markup-schema'
import { List } from '@formily/antd-mobile'

function Index(props) {
  return (
    <>
      <List title="有默认值的控件无法被清空">
        <Demo1 />
      </List>
      <List title="强制清空重置">
        <Demo2 />
      </List>
      <List title="重置并校验">
        <Demo3 />
      </List>
      <List title="强制清空重置并校验">
        <Demo4 />
      </List>
    </>
  )
}

export default Index
