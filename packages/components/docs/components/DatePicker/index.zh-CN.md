# DatePicker

> 日期选择器

<code src="./demos/index.tsx" />

## API

| 属性名    | 类型                                                                             | 描述                                                                                       | 默认值       |
| --------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------ |
| clearable | `boolean`                                                                        | 是否启用清除图标，点击清除图标后会清空值                                                   | false        |
| picker    | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year'`                             | 设置选择器类型，同时设置`precision`，则会合并                                              | -            |
| format    | `string \| (value: moment) => string \| (string \| (value: moment) => string)[]` | 设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 moment.js，支持自定义格式 | `YYYY-MM-DD` |

其它参数参考：https://mobile.ant.design/zh/components/picker#datepicker
