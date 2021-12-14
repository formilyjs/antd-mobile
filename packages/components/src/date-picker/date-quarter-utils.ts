import {
  DatePickerFilter,
  Precision,
} from 'antd-mobile/es/components/date-picker/date-picker-utils'
import {
  PickerColumn,
  PickerColumnItem,
} from 'antd-mobile/es/components/picker'
import moment from 'moment'
import { ReactNode } from 'react'

export type QuarterPrecision = 'year' | 'quarter'

const precisionRankRecord: Record<QuarterPrecision, number> = {
  year: 0,
  quarter: 1,
}

export function defaultRenderLabel(
  type: Precision | QuarterPrecision,
  data: number
) {
  return data.toString()
}

export const generateDatePickerColumns = (
  selected: string[],
  min: Date,
  max: Date,
  precision: QuarterPrecision,
  renderLabel: (type: Precision | QuarterPrecision, data: number) => ReactNode,
  filter: DatePickerFilter | undefined
) => {
  const ret: PickerColumn[] = []

  const minYear = min.getFullYear()
  const maxYear = max.getFullYear()

  const rank = precisionRankRecord[precision]

  if (rank >= precisionRankRecord.year) {
    const years: PickerColumnItem[] = []
    for (let i = minYear; i <= maxYear; i++) {
      const value = i.toString()
      years.push({
        label: renderLabel ? renderLabel('year', i) : value,
        value,
      })
    }
    ret.push(years)
  }

  const selectedYear = parseInt(selected[0])
  const isInMinYear = selectedYear === minYear
  const isInMaxYear = selectedYear === maxYear

  const minDay = moment(min)
  const maxDay = moment(max)
  const minQuarter = minDay.quarter()
  const maxQuarter = maxDay.quarter()

  // const selectedQuarter = parseInt(selected[1])
  // const isInMinQuarter = isInMinYear && selectedQuarter === minQuarter
  // const isInMaxQuarter = isInMaxYear && selectedQuarter === maxQuarter

  const generateColumn = (
    from: number,
    to: number,
    precision: QuarterPrecision
  ) => {
    let column: number[] = []
    for (let i = from; i <= to; i++) {
      column.push(i)
    }
    const prefix = selected.slice(0, precisionRankRecord[precision])
    const currentFilter = filter?.[precision]
    if (currentFilter && typeof currentFilter === 'function') {
      column = column.filter((i) =>
        currentFilter(i, {
          get date() {
            const stringArray = [...prefix, i.toString()]
            return convertStringArrayToDate(stringArray)
          },
        })
      )
    }
    return column
  }

  if (rank >= precisionRankRecord.quarter) {
    const lower = isInMinYear ? minQuarter : 1
    const upper = isInMaxYear ? maxQuarter : 4
    const months = generateColumn(lower, upper, 'quarter')
    ret.push(
      months.map((v) => {
        return {
          label: renderLabel('quarter', v),
          value: v.toString(),
        }
      })
    )
  }

  return ret
}

export function convertDateToStringArray(
  date: Date | undefined | null
): string[] {
  if (!date) return []
  const day = moment(date)
  return [day.year().toString(), day.quarter().toString()]
}

export function convertStringArrayToDate(
  value: (string | null | undefined)[]
): Date {
  const yearString = value[0] ?? '1900'
  const quarterString = value[1] ?? '1' //季度

  const day = moment()
    .year(parseInt(yearString))
    .quarter(parseInt(quarterString))
  return day.toDate()
}
