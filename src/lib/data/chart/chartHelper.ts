export const generateChartData = (data: any[], userKeys: string[]) => {
  const dataArr = Object.entries(data)
  const generatedChartData = []

  dataArr.forEach((item) => {
    const [date, val] = item
    const userData = {}

    userKeys.forEach((key) => {
      userData[key] = val.users[key]
    })

    generatedChartData.push({
      id: date,
      date,
      degraded: val.degraded,
      ...userData,
    })
  })

  return generatedChartData
}

export function mapData(id: string, key: string, partial: any[]) {
  return {
    id,
    data: partial.map((item) => ({
      x: item.date,
      y: item[key],
      degraded: item.degraded,
    })),
  }
}

export const calculateAverages = (partial: any[], userKeys: string[]) => {
  const validLength = partial.length
  const sum = {}

  userKeys.forEach((key) => {
    sum[key] = partial.reduce((acc, cur) => acc + cur[key], 0)
  })

  const value = {}
  userKeys.forEach((key) => {
    value[key] = Math.floor(sum[key] / validLength)
  })

  const map = userKeys
    .map((key) => ({
      id: key.charAt(0).toUpperCase() + key.slice(1),
      value: value[key],
    }))
    .sort((a, b) => b.value - a.value)

  return map
}
