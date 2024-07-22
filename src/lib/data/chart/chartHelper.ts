import { format } from "date-fns"

export const generateChartData = (data: any[], chartKeys: string[]) => {
  const dataArr = Object.entries(data)
  const generatedChartData = []

  const isOnlineUsers = chartKeys[0] === "online_users"

  dataArr.forEach((item) => {
    const [date, val] = item
    let chartData = {}

    chartKeys.forEach((key) => {
      // multi line chart
      if (chartKeys.length > 1) {
        chartData[key] = val.users[key]
      } else if (isOnlineUsers) {
        // online users chart
        chartData[key] = Number(val[1])
      } else {
        // single line chart
        chartData[key] = val[key]
      }
    })

    const chartEntry = {
      id: isOnlineUsers ? val[0] : date,
      date: isOnlineUsers ? val[0] : date,
      degraded: isOnlineUsers ? false : val.degraded,
      ...chartData,
    }

    generatedChartData.push(chartEntry)
  })

  return generatedChartData
}

export const mapChartData = (id: string, key: string, partial: any[]) => {
  if (id === "Online Users") {
    return {
      id,
      data: partial.map((item) => ({
        x: format(new Date(item.date * 1000), "yyyy-MM-dd HH:mm"),
        y: item[key],
      })),
    }
  } else {
    return {
      id,
      data: partial.map((item) => ({
        x: item.date,
        y: item[key],
        degraded: item.degraded,
      })),
    }
  }
}

export const calculateAverages = (partial: any[], chartKeys: string[]) => {
  const validLength = partial.length
  const sum = {}

  chartKeys.forEach((key) => {
    sum[key] = partial.reduce((acc, cur) => acc + cur[key], 0)
  })

  const value = {}
  chartKeys.forEach((key) => {
    value[key] = Math.floor(sum[key] / validLength)
  })

  const map = chartKeys
    .map((key) => ({
      id: key.charAt(0).toUpperCase() + key.slice(1),
      value: value[key],
    }))
    .sort((a, b) => b.value - a.value)

  return map
}

export const calculateAvg = (chartData) => {
  let sumActiveParcels = 0
  let sumActiveScenes = 0
  let sumGuestUsers = 0
  let sumNamedUsers = 0
  let sumNewUsers = 0
  let sumUniqueUsers = 0
  let count = chartData.length

  chartData.forEach((data) => {
    sumActiveParcels += data.active_parcels
    sumActiveScenes += data.active_scenes
    sumGuestUsers += data.guest_users
    sumNamedUsers += data.named_users
    sumNewUsers += data.new_users
    sumUniqueUsers += data.unique_users
  })

  const avgActiveParcels = Math.round(sumActiveParcels / count)
  const avgActiveScenes = Math.round(sumActiveScenes / count)
  const avgGuestUsers = Math.round(sumGuestUsers / count)
  const avgNamedUsers = Math.round(sumNamedUsers / count)
  const avgNewUsers = Math.round(sumNewUsers / count)
  const avgUniqueUsers = Math.round(sumUniqueUsers / count)

  return {
    avgActiveParcels,
    avgActiveScenes,
    avgGuestUsers,
    avgNamedUsers,
    avgNewUsers,
    avgUniqueUsers,
  }
}

export const transformChartData = (chartData) => {
  let transformedData = {}
  chartData.forEach((scene) => {
    scene.values.forEach((entry) => {
      const { date, value } = entry
      if (!transformedData[date]) {
        transformedData[date] = { date }
      }
      transformedData[date][scene.name] = value
    })
  })

  const sortedData = Object.keys(transformedData)
    .sort()
    .map((date) => transformedData[date])

  return sortedData
}

const darkThemeColors = [
  "#ff5555", // Red
  "#50fa7b", // Green
  "#f1fa8c", // Yellow
  "#bd93f9", // Purple
  "#ff79c6", // Pink
  "#8be9fd", // Cyan
  "#ffb86c", // Orange
  "#6272a4", // Blue-Gray
  "#f8f8f2", // Light Gray
  "#ffb86c", // Light Orange
]

const lightThemeColors = [
  "#d32f2f", // Strong Red
  "#388e3c", // Strong Green
  "#fbc02d", // Bright Yellow
  "#7b1fa2", // Strong Purple
  "#e91e63", // Vivid Pink
  "#03a9f4", // Vivid Cyan
  "#fb8c00", // Bright Orange
  "#0288d1", // Bright Blue
  "#c0ca33", // Bright Lime Green
  "#f57c00", // Bright Coral
]

export const getThemeColor = (() => {
  const usedColors = {
    dark: new Set<string>(),
    light: new Set<string>(),
  }

  return (theme: "dark" | "light"): string => {
    const colors = theme === "dark" ? darkThemeColors : lightThemeColors
    const availableColors = colors.filter(
      (color) => !usedColors[theme].has(color)
    )

    if (availableColors.length === 0) {
      usedColors[theme].clear()
    }

    const randomIndex = Math.floor(Math.random() * availableColors.length)
    const selectedColor = availableColors[randomIndex]

    usedColors[theme].add(selectedColor)
    return selectedColor
  }
})()

export const availableProperties = [
  "total_visitors",
  "unique_visitors",
  "unique_visitors_afk",
  "unique_addresses",
  "share_of_global_visitors",
  "avg_time_spent",
  "avg_time_spent_afk",
  "percent_of_users_afk",
  "total_logins",
  "unique_logins",
  "total_logouts",
  "unique_logouts",
  "complete_sessions",
  "avg_complete_session_duration",
]

export const availableDateRanges = [7, 14, 30, 60, 90, 180, 365]

export const transformToTitleCase = (str: string) => {
  return str
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
