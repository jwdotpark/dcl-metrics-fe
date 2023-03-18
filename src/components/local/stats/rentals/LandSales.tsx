// @ts-nocheck
import { useEffect, useState } from "react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Box } from "@chakra-ui/react"
import LineChart from "../../../../lib/LineChart"
import BoxTitle from "../../../layout/local/BoxTitle"
import { date, sliceData } from "../../../../lib/data/chartInfo"
import DateRangeButton from "../daterange/DateRangeButton"

const LandSales = ({ data }) => {
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
      thirty_day_avg: item[1].thirty_day_avg,
      seven_day_avg: item[1].seven_day_avg,
      floor: item[1].floor,
    })
  })

  const partial = sliceData(chartData, dateRange)
  //const dateString = date(chartData, dateRange).date

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
    mapData("30 Days", "thirty_day_avg"),
    mapData("7 Days", "seven_day_avg"),
    mapData("Floor", "floor"),
  ]

  const calculateAverages = (partial) => {
    const validLength = partial.length
    const sum = {
      thirtyDayAvg: partial.reduce((acc, cur) => acc + cur.thirty_day_avg, 0),
      sevenDayAvg: partial.reduce((acc, cur) => acc + cur.seven_day_avg, 0),
      floor: partial.reduce((acc, cur) => acc + cur.floor, 0),
    }
    const value = {
      thirtyDayAvg: Math.floor(sum.thirtyDayAvg / validLength),
      sevenDayAvg: Math.floor(sum.sevenDayAvg / validLength),
      floor: Math.floor(sum.floor / validLength),
    }
    const map = [
      { id: "30 Day", value: value.thirtyDayAvg },
      { id: "7 Day", value: value.sevenDayAvg },
      { id: "Floor", value: value.floor },
    ]
    return map
  }

  useEffect(() => {
    setAvgData(calculateAverages(partial))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  return (
    <BoxWrapper colSpan={0}>
      <Box h="auto">
        <BoxTitle
          name="Land Sales"
          date={""}
          avgData={avgData}
          slicedData={partial}
          color={color}
          description="Data from Opensea, prices in MANA"
        />
        <DateRangeButton
          dateRange={dateRange}
          setDateRange={setDateRange}
          validLegnth={chartData.length - 1}
          name="rentals"
          yesterday={false}
        />
        <LineChart
          data={result}
          color={color}
          name="rental"
          avgData={avgData}
        />
      </Box>
    </BoxWrapper>
  )
}

export default LandSales
