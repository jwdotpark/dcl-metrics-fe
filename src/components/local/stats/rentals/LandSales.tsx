/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Box } from "@chakra-ui/react"
//import LineChart from "../../../../lib/LineChart"
import BoxTitle from "../../../layout/local/BoxTitle"
import { sliceData, findFalse } from "../../../../lib/data/chart/chartInfo"
import DateRangeButton from "../daterange/DateRangeButton"
import { calculateAverages } from "../../../../lib/data/chart/chartHelper"

const LandSales = ({ data }) => {
  const chartData = []
  const dataArr: any[] = Object.entries(data)
  const color = useMemo(() => ["#48BB78", "#9F7AEA", "#4299E1"], [])
  const chartKeys = useMemo(
    () => ["thirty_day_avg", "seven_day_avg", "floor"],
    []
  )

  const defaultDateRange = dataArr.length - 1
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [avgData, setAvgData] = useState([])

  const [lineColor, setLineColor] = useState(color)
  const [avgColor, setAvgColor] = useState(color)

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

  result.map((item: any, i) => {
    item.color = color[i]
  })

  const lineVisibility = result.map(() => {
    return true
  })

  const [line, setLine] = useState(lineVisibility)

  const filteredResult = result.filter((item, i) => {
    return line[i]
  })

  useEffect(() => {
    setAvgData(calculateAverages(partial, chartKeys))
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
    <BoxWrapper colSpan={0}>
      <Box h="auto" data-testid="landSales">
        <BoxTitle
          name="Land Sales"
          date={""}
          avgData={avgData}
          slicedData={partial}
          color={avgColor}
          description="Data from Opensea, prices in MANA"
          line={line}
          setLine={setLine}
        />
        <DateRangeButton
          dateRange={dateRange}
          setDateRange={setDateRange}
          validLegnth={chartData.length - 1}
          name="rentals"
          yesterday={false}
        />
        {/*<LineChart
          data={filteredResult}
          color={lineColor}
          name="rental"
          avgData={avgData}
          rentalData={undefined}
          line={line}
          avgColor={avgColor}
        />*/}
      </Box>
    </BoxWrapper>
  )
}

export default LandSales
