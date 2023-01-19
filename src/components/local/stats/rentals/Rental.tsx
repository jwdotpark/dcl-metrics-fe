import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Box } from "@chakra-ui/react"
import LineChart from "../../../../lib/LineChart"
import BoxTitle from "../../../layout/local/BoxTitle"
import {
  date,
  defaultDateRange,
  sliceData,
} from "../../../../lib/data/chartInfo"
import { useEffect, useState } from "react"
import DateRangeButton from "../daterange/DateRangeButton"

const Rental = ({ data }) => {
  const chartData = []
  const color = ["blue", "yellow", "green"]
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [avgData, setAvgData] = useState([])

  data.map((item) => {
    chartData.push({
      id: item.date,
      date: item.date,
      degraded: false,
      floor: item.floor,
      seven_day_avg: item.seven_day_avg,
      thirty_day_avg: item.thirty_day_avg,
    })
  })

  // @ts-ignore
  const partial = sliceData(chartData, dateRange)
  // @ts-ignore
  const dateString = date(chartData, dateRange).date

  const mapData = (id: string, key) => {
    return {
      id: id,
      data: data.map((item) => ({
        x: item.date,
        y: item[key],
        degraded: false,
      })),
    }
  }

  const result = [
    mapData("floor", "floor"),
    mapData("seven_day_avg", "seven_day_avg"),
    mapData("thirty_day_avg", "thirty_day_avg"),
  ]

  const calculateAverages = (partial) => {
    const validLength = partial.length
    const sum = {
      floor: partial.reduce((acc, cur) => acc + cur.floor, 0),
      sevenDayAvg: partial.reduce((acc, cur) => acc + cur.seven_day_avg, 0),
      thirtyDayAvg: partial.reduce((acc, cur) => acc + cur.thirty_day_avg, 0),
    }
    const value = {
      floor: Math.floor(sum.floor / validLength),
      sevenDayAvg: Math.floor(sum.sevenDayAvg / validLength),
      thirtyDayAvg: Math.floor(sum.thirtyDayAvg / validLength),
    }
    const map = [
      { id: "Floor", value: value.floor },
      { id: "7 Day Avg", value: value.sevenDayAvg },
      { id: "30 Day Avg", value: value.thirtyDayAvg },
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
          date={dateString}
          avgData={avgData}
          slicedData={partial}
          color={color}
          description="rentals"
        />
        <DateRangeButton
          dateRange={dateRange}
          setDateRange={setDateRange}
          validLegnth={90}
          name="rentals"
          yesterday={false}
        />
        <LineChart data={result} color={color} name="rental" />
      </Box>
    </BoxWrapper>
  )
}

export default Rental
