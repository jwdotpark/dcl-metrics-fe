import moment from "moment"
import { convertSeconds } from "../hooks/utils"

export const chartHeight = 350
export const defaultDateRange = 90
export const dateFormat = "MMM. Do"

export const sliceData = (chartData: [], dateRange: number) => {
  if (chartData.length - dateRange > 0) {
    return chartData.slice(chartData.length - dateRange, chartData.length)
  } else {
    return chartData
  }
}

// FIXME change the name of function for clarity
export const date = (chartData: [], dateRange: number) => {
  const partial = sliceData(chartData, dateRange)
  // @ts-ignore
  const first = moment(partial[0].date).format(dateFormat)
  // @ts-ignore
  const last = moment(partial[partial.length - 1].date).format(dateFormat)
  return { date: { first: first, last: last } }
}

export const plotMissingDates = (data) => {
  const timestamps = data.map((d) => d.date)
  const minTimestamp = Math.min(...timestamps)
  const maxTimestamp = Math.max(...timestamps)

  const allTimestamps = Array.from(
    { length: maxTimestamp - minTimestamp + 1 },
    (_, i) => minTimestamp + i
  )

  const yesterday = moment().subtract(1, "days").unix()
  const missingTimestamps = allTimestamps.filter(
    (timestamp) => timestamp > maxTimestamp && timestamp <= yesterday
  )

  const missingData = missingTimestamps.map((timestamp) => ({
    date: timestamp,
    id: 0,
    rentals: 0,
    volume: 0,
  }))

  const newData = [...data, ...missingData]

  return newData.sort((a, b) => a.date - b.date)
}

export const findFalse = (obj) => {
  const falseKeys = []
  for (let key in obj) {
    if (obj[key] === false) {
      falseKeys.push(key)
    }
  }
  return falseKeys
}

export const formatCount = (val) => {
  if (Number(val) === 0) {
    return "None"
  } else if (val < 60 * 60 * 24) {
    return convertSeconds(val)
  } else {
    return "24h"
  }
}
