export const dateRangeStr = (value) => {
  if (value === 1) {
    return "yesterday"
  } else if (value === 7) {
    return "last_week"
  } else if (value === 30) {
    return "last_month"
  } else if (value === 90) {
    return "last_quarter"
  }
}

export const sliceStr = (value) => {
  const length = 30
  if (value && value.length > length) {
    return value.slice(0, length) + "..."
  } else {
    return value
  }
}

export const normalizeValue = (data) => {
  const valueArr = []
  const normalizedValueArr = []
  for (let i = 0; i < data.length; i++) {
    valueArr.push(
      data[i].time_spent ? data[i].time_spent : data[i].parcels_visited
    )
  }
  const max = Math.max(...valueArr)
  const min = Math.min(...valueArr)
  const range = max - min
  for (let i = 0; i < valueArr.length; i++) {
    normalizedValueArr.push(
      Math.round(((valueArr[i] - min) / range) * (100 - 20) + 20)
    )
  }
  return normalizedValueArr
}

export const baseUrl = "https://api.decentraland.org/v1/parcels/"
export const mapUrl = "/map.png?width=auto&height=auto&size=25"
