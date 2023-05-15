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
  const minTimestamp = Math.min.apply(
    null,
    data.map((d) => d.date)
  )
  const maxTimestamp = Math.max.apply(
    null,
    data.map((d) => d.date)
  )

  const allTimestamps = []
  for (
    let timestamp = minTimestamp;
    timestamp <= maxTimestamp;
    timestamp += 86400
  ) {
    allTimestamps.push(timestamp)
  }

  const yesterday = moment().subtract(1, "days").unix()
  for (
    let timestamp = maxTimestamp;
    timestamp <= yesterday;
    timestamp += 86400
  ) {
    allTimestamps.push(timestamp)
  }

  allTimestamps.forEach((timestamp) => {
    if (!data.find((d) => d.date === timestamp)) {
      data.push({
        date: timestamp,
        id: 0,
        rentals: 0,
        volume: 0,
      })
    }
  })

  data.sort((a, b) => a.date - b.date)
  return data
}

// FIXME type checking
export const findFalse = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    throw new TypeError("not an object")
  }

  const falseKeys = []
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !obj[key]) {
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
