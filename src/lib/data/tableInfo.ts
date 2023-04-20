export const dateRangeStr = (value) => {
  switch (value) {
    case 1:
      return "yesterday"
    case 7:
      return "last_week"
    case 30:
      return "last_month"
    case 90:
      return "last_quarter"
    case "":
      return "all_time"
    default:
      return null
  }
}

export const sliceStr = (value) => {
  const length = 30
  if (value && value.length > length) {
    return value.slice(0, length) + ".."
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
