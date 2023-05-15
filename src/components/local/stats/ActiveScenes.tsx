// @ts-nocheck
import { useEffect, useState } from "react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import {
  defaultDateRange,
  sliceData,
  sliceDateRange,
  findFalse,
} from "../../../lib/data/chartInfo"
import BoxTitle from "../../layout/local/BoxTitle"
import DateRangeButton from "./daterange/DateRangeButton"
import LineChart from "../../../lib/LineChart"

const ActiveScenes = ({ data }) => {
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const color = ["#ffb86c"]
  const [avgData, setAvgData] = useState([])
  const chartData = []
  const dataArr = Object.entries(data)

  const [lineColor, setLineColor] = useState(color)
  const [avgColor, setAvgColor] = useState(color)

  dataArr.map((item) => {
    chartData.push({
      id: item[0],
      date: item[0],
      active_scenes: item[1].active_scenes,
      degraded: item[1].degraded,
    })
  })

  const partial = sliceData(chartData, dateRange)
  const dateString = sliceDateRange(chartData, dateRange).date

  const mapData = (id: string, key: number) => {
    return {
      id,
      data: partial.map((item) => ({
        x: item.date,
        y: item[key],
        degraded: item.degraded,
      })),
    }
  }

  const result = [mapData("Scene Visitors", "active_scenes")]

  result.map((item, i) => {
    item.color = color[i]
  })

  const lineVisibility = result.map(() => {
    return true
  })

  const [line, setLine] = useState(lineVisibility)

  const calculateAverages = (partial) => {
    const validLength = partial.length
    const sum = {
      active_scenes: partial.reduce((acc, cur) => acc + cur.active_scenes, 0),
    }
    const value = {
      active_scenes: Math.floor(sum.active_scenes / validLength),
    }
    const map = [{ id: "Average Value", value: value.active_scenes }]
    return map
  }

  useEffect(() => {
    setAvgData(calculateAverages(partial))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  useEffect(() => {
    const res = findFalse(line)
    const newChartColor = color.filter((item, i) => {
      return !res.includes(i.toString())
    })
    const newAvgColor = color.map((item, i) => {
      if (res.includes(i.toString())) {
        return "gray.400"
      } else {
        return item
      }
    })

    setLineColor(newChartColor)
    setAvgColor(newAvgColor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line])

  return (
    <BoxWrapper colSpan={3}>
      <BoxTitle
        name="Scenes Visited"
        date={dateString}
        avgData={avgData}
        slicedData={partial}
        color={avgColor}
        line={line}
        setLine={setLine}
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="global_scenes_visited"
        yesterday={false}
      />
      <LineChart
        data={result}
        color={lineColor}
        name="activeScenes"
        avgData={avgData}
        line={line}
        avgColor={avgColor}
      />
    </BoxWrapper>
  )
}

export default ActiveScenes
