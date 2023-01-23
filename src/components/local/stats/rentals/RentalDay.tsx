// @ts-nocheck
import { Box, color } from "@chakra-ui/react"
import { useState } from "react"
import { defaultDateRange, sliceData } from "../../../../lib/data/chartInfo"
import LineChart from "../../../../lib/LineChart"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import DateRangeButton from "../daterange/DateRangeButton"

const RentalDay = ({ data }) => {
  const dataArr = Object.entries(data)
  const chartData = []
  const color = ["#48BB78", "#4299E1", "#9F7AEA", "#F56565"]
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [avgData, setAvgData] = useState([])

  const value = 10000000000000000000
  const value2 = 100000000000000000
  const value3 = 100
  dataArr.map((item) => {
    chartData.push({
      id: "Day Data",
      degraded: false,
      date: item[1].date,
      lessorEarnings: Math.round(item[1].lessorEarnings / value),
      volume: Math.round(item[1].volume / value),
      feeCollectorEarnings: Math.round(item[1].feeCollectorEarnings / value2),
      rentals: item[1].rentals * value3,
    })
  })

  const partial = sliceData(chartData, dateRange)

  const mapData = (id: string, key: number) => {
    return {
      id: id,
      data: partial.map((item) => ({
        x: item.date,
        y: item[key],
        degraded: item.degraded,
      })),
    }
  }

  const result = [
    mapData("Volume", "volume"),
    mapData("Lessor Earnings", "lessorEarnings"),
    mapData("Fee Collector Earnings", "feeCollectorEarnings"),
    mapData("Rentals", "rentals"),
  ]

  return (
    <Box w={["100%", "100%"]} mr={[0, 4]}>
      <BoxWrapper>
        <BoxTitle
          name="Rental Day"
          date={""}
          avgData={""}
          slicedData={{}}
          color={color}
          description="Daily rental data"
        />
        <DateRangeButton
          dateRange={""}
          setDateRange={setDateRange}
          validLegnth={90}
          name="global_unique_visitors"
          yesterday={false}
        />
        <LineChart data={result} color={color} name="daily_rental" log={true} />
      </BoxWrapper>
    </Box>
  )
}

export default RentalDay
