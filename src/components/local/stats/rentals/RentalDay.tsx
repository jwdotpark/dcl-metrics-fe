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

  const value = 1000000000000000
  dataArr.map((item) => {
    chartData.push({
      id: "Day Data",
      degraded: false,
      date: item[1].date,
      feeCollectorEarnings: item[1].feeCollectorEarnings,
      lessorEarnings: item[1].lessorEarnings,
      rentals: item[1].rentals,
      volume: item[1].volume,
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
    mapData("Rentals", "rentals"),
    mapData("Volume", "volume"),
    mapData("Lessor Earnings", "lessorEarnings"),
    mapData("Fee Collector Earnings", "feeCollectorEarnings"),
  ]

  console.log("day rental", result)

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
        <LineChart data={result} color={color} name="daily_rental" />
      </BoxWrapper>
    </Box>
  )
}

export default RentalDay
