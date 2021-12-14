# CheckList

> 可勾选列表

## Basic

<code src="./demos/index.tsx" />

## API

### Checkbox

| 属性名      | 类型                             | 描述               | 默认值     |
| ----------- | -------------------------------- | ------------------ | ---------- |
| options     | `string[] \| ICheckListOption[]` | 指定可选项         | -          |
| layout      | `'vertical' \| 'horizontal'`     | 布局方式           | `vertical` |
| layoutBlock | `boolean`                        | 是否渲染为块级元素 | `false`    |

其它参数参考：https://mobile.ant.design/components/check-list#checklist

### ICheckListOption

```ts
export interface ICheckListOption {
  label: string
  value: string
  disabled?: boolean
}
```
