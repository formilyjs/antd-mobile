# Checkbox

> 勾选框

## 基础用法

<code src="./demos/index.tsx"/>

## API

### Checkbox

| 属性名      | 类型                         | 描述               | 默认值     |
| ----------- | ---------------------------- | ------------------ | ---------- |
| layout      | `'vertical' \| 'horizontal'` | 布局方式           | `vertical` |
| layoutBlock | `boolean`                    | 是否渲染为块级元素 | `false`    |

其它参数参考：[https://mobile.ant.design/zh/components/checkbox#checkbox](https://mobile.ant.design/zh/components/checkbox#checkbox)

### Checkbox.Group

| 属性名      | 类型                            | 描述               | 默认值     |
| ----------- | ------------------------------- | ------------------ | ---------- |
| options     | `string[] \| ICheckboxOption[]` | 指定可选项         | -          |
| layout      | `'vertical' \| 'horizontal'`    | 布局方式           | `vertical` |
| layoutBlock | `boolean`                       | 是否渲染为块级元素 | `false`    |

其它参数参考：[https://mobile.ant.design/zh/components/checkbox#checkboxgroup](https://mobile.ant.design/zh/components/checkbox#checkboxgroup)

### ICheckboxOption

```ts
export interface ICheckboxOption {
  label: string
  value: string
  disabled?: boolean
}
```
