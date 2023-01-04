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

export const date = (chartData, dateRange) => {
  const partial = sliceData(chartData, dateRange)
  // @ts-ignore
  // TODO type this
  const first = moment(partial[0].date).format(dateFormat)
  // @ts-ignore
  // TODO type this
  const last = moment(partial[partial.length - 1].date).format(dateFormat)
  console.log(first, last)
  return { date: { first: first, last: last } }
}
