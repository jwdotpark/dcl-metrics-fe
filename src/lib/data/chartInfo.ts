import moment from "moment"

export const chartHeight = 300
export const defaultDateRange = 90
export const dateFormat = "MMM. Do"

export const sliceData = (chartData: [], dateRange: number) => {
  if (chartData.length - dateRange > 0) {
    return chartData.slice(chartData.length - dateRange, chartData.length)
  } else {
    return chartData
  }
}

// TODO type this
export const date = (chartData: [], dateRange: number) => {
  const partial = sliceData(chartData, dateRange)
  // @ts-ignore
  const first = moment(partial[0].date).format(dateFormat)
  // @ts-ignore
  const last = moment(partial[partial.length - 1].date).format(dateFormat)
  return { date: { first: first, last: last } }
}
