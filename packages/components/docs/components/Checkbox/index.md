# Checkbox

> 勾选框

## Basic

<code src="./demos/index.tsx" />

## API

### Checkbox

| Property name | Type                         | Description        | Default    |
| ------------- | ---------------------------- | ------------------ | ---------- |
| layout        | `'vertical' \| 'horizontal'` | 布局方式           | `vertical` |
| layoutBlock   | `boolean`                    | 是否渲染为块级元素 | `false`    |

其它参数参考：https://mobile.ant.design/components/checkbox#checkbox

### Checkbox.Group

| Property name | Type                            | Description        | Default    |
| ------------- | ------------------------------- | ------------------ | ---------- |
| options       | `string[] \| ICheckboxOption[]` | 指定可选项         | -          |
| layout        | `'vertical' \| 'horizontal'`    | 布局方式           | `vertical` |
| layoutBlock   | `boolean`                       | 是否渲染为块级元素 | `false`    |

其它参数参考：https://mobile.ant.design/components/checkbox#checkboxgroup

### ICheckboxOption

```ts
export interface ICheckboxOption {
  label: string
  value: string
  disabled?: boolean
}
```
