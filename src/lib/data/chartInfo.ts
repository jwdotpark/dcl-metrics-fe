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

// TODO type this
export const date = (chartData: [], dateRange: number) => {
  const partial = sliceData(chartData, dateRange)
  // @ts-ignore
  const first = moment(partial[0].date).format(dateFormat)
  // @ts-ignore
  const last = moment(partial[partial.length - 1].date).format(dateFormat)
  return { date: { first: first, last: last } }
}

export const plotMissingDates = (data) => {
  // Get the minimum and maximum dates from the data
  const minTimestamp = Math.min.apply(
    null,
    data.map((d) => d.date)
  )
  const maxTimestamp = Math.max.apply(
    null,
    data.map((d) => d.date)
  )

  // Create an array of all timestamps between the minimum and maximum timestamps
  const allTimestamps = []
  for (
    let timestamp = minTimestamp;
    timestamp <= maxTimestamp;
    timestamp += 86400
  ) {
    allTimestamps.push(timestamp)
  }

  // Add an empty object with the missing timestamp to the data array
  allTimestamps.forEach((timestamp) => {
    if (!data.find((d) => d.date === timestamp)) {
      console.log(
        "Missing timestamp: " + moment.unix(timestamp).format("YYYY-MM-DD")
      )
      data.push({
        date: timestamp,
        id: 0,
        rentals: 0,
        volume: 0,
      })
    }
  })

  // Sort the data array by timestamp
  data.sort((a, b) => a.date - b.date)
  return data
}
