import { format } from "date-fns"
//import moment from "moment"

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
