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
  const minDate = new Date(
    Math.min.apply(
      null,
      data.map((d) => new Date(d.date))
    )
  )

  const maxDate = new Date(
    Math.max.apply(
      null,
      data.map((d) => new Date(d.date))
    )
  )

  // Create an array of all dates between the minimum and maximum dates
  const allDates = []
  for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
    allDates.push(new Date(d).toISOString().slice(0, 10))
  }

  // Add an empty object with the missing date to the data array
  allDates.forEach((date) => {
    if (!data.find((d) => d.date === date)) {
      data.push({ id: date, date: date, volume: 0, rentals: 0 })
    }
  })

  // Sort the data array by date
  // @ts-ignore
  data.sort((a, b) => new Date(a.date) - new Date(b.date))
  return data
}
