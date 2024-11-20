import { format, getUnixTime, subDays } from "date-fns"
import { convertSeconds } from "../../hooks/utils"

export const chartHeight = 350
export const gridChartHeight = 350
export const defaultDateRange = 90
export const dateFormat = "MMM. Do"
export const chartFormat = {
  fontSize: "14px",
}

export const sliceData = (chartData: any[], dateRange: number) => {
  if (chartData.length - dateRange > 0) {
    return chartData.slice(chartData.length - dateRange, chartData.length)
  } else {
    return chartData
  }
}

export const sliceDateRange = (chartData: any[], dateRange: number) => {
  const partial = chartData.slice(-dateRange)
  const first = format(new Date(partial[0].date * 1000), dateFormat)
  const last = format(
    new Date(partial[partial.length - 1].date * 1000),
    dateFormat
  )

  return { date: { first: first, last: last } }
}

export const plotMissingDataArr = (data) => {
  const minDate = new Date(Math.min(...data.map((d) => new Date(d.date))))
  const maxDate = new Date(Math.max(...data.map((d) => new Date(d.date))))
  const dateRange = []
  for (let d = minDate; d <= maxDate; d.setDate(d.getDate() + 1)) {
    dateRange.push(new Date(d))
  }

  const dataByDate = {}
  for (const d of data) {
    dataByDate[d.date] = d
  }

  const plotData = []
  for (const date of dateRange) {
    const dateString = date.toISOString().slice(0, 10)
    let time_spent = dataByDate[dateString]?.time_spent ?? 0
    const day = 60 * 60 * 24
    if (time_spent > day) {
      time_spent = day
    }

    plotData.push({ date: dateString, time_spent })
  }

  return plotData
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

  const yesterday = getUnixTime(subDays(new Date(), 1))
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
