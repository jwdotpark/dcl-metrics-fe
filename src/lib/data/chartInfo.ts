import moment from "moment"

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

export const findFalse = (obj) => {
  const falseKeys = []
  for (let key in obj) {
    if (obj[key] === false) {
      falseKeys.push(key)
    }
  }
  return falseKeys
}

export const plotMissingDataArr = (data, property) => {
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
    const time_spent = dataByDate[dateString]?.time_spent ?? 0
    plotData.push({ date: dateString, time_spent })
  }

  return plotData
}
