// @ts-nocheck
import { useEffect, useState, useMemo } from "react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Box } from "@chakra-ui/react"
import LineChart from "../../../../lib/LineChart"
import BoxTitle from "../../../layout/local/BoxTitle"
import { date, sliceData } from "../../../../lib/data/chartInfo"
import DateRangeButton from "../daterange/DateRangeButton"

const Rental = ({ data }) => {
  const chartData = []
  const dataArr = Object.entries(data)
  const color = ["#eb6f92", "#ea9d34", "#31748f"]

  const defaultDateRange = dataArr.length - 1
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [avgData, setAvgData] = useState([])

  dataArr.map((item) => {
    chartData.push({
      id: item[1].date,
      date: item[1].date,
      degraded: false,
      floor: item[1].floor,
      seven_day_avg: item[1].seven_day_avg,
      thirty_day_avg: item[1].thirty_day_avg,
    })
  })

  const partial = sliceData(chartData, dateRange)
  const dateString = date(chartData, dateRange).date

  const mapData = (id: string, key) => {
    return {
      id: id,
      data: partial.map((item) => ({
        x: item.date,
        y: item[key],
        degraded: false,
      })),
    }
  }

  const result = [
    mapData("7 Days AVG", "seven_day_avg"),
    mapData("30 Days AVG", "thirty_day_avg"),
    mapData("Floor", "floor"),
  ]

  const calculateAverages = (partial) => {
    const validLength = partial.length
    const sum = {
      sevenDayAvg: partial.reduce((acc, cur) => acc + cur.seven_day_avg, 0),
      thirtyDayAvg: partial.reduce((acc, cur) => acc + cur.thirty_day_avg, 0),
      floor: partial.reduce((acc, cur) => acc + cur.floor, 0),
    }
    const value = {
      sevenDayAvg: Math.floor(sum.sevenDayAvg / validLength),
      thirtyDayAvg: Math.floor(sum.thirtyDayAvg / validLength),
      floor: Math.floor(sum.floor / validLength),
    }
    const map = [
      { id: "7 Day Avg", value: value.sevenDayAvg },
      { id: "30 Day Avg", value: value.thirtyDayAvg },
      { id: "Floor", value: value.floor },
    ].sort((a, b) => {
      return b.value - a.value
    })
    return map
  }

  useEffect(() => {
    setAvgData(calculateAverages(partial))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  return (
    <BoxWrapper>
      <Box h="auto">
        <BoxTitle
          name="Rentals"
          date={""}
          avgData={avgData}
          slicedData={partial}
          color={color}
          description="Average rental price in the last period"
        />
        <DateRangeButton
          dateRange={dateRange}
          setDateRange={setDateRange}
          validLegnth={chartData.length}
          name="rentals"
          yesterday={false}
        />
        <LineChart data={result} color={color} name="rental" />
      </Box>
    </BoxWrapper>
  )
}

export default Rental
