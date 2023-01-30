// @ts-nocheck
import { Box, color } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { defaultDateRange, sliceData } from "../../../../lib/data/chartInfo"
import LineChart from "../../../../lib/LineChart"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import DateRangeButton from "../daterange/DateRangeButton"
import { plotMissingDates } from "../../../../lib/data/chartInfo"
import moment from "moment"

const RentalDay = ({ data }) => {
  const { analyticsDayDatas } = data
  const plottedData = plotMissingDates(analyticsDayDatas)
  const dataArr = Object.entries(plottedData)
  const chartData = []
  //const color = ["#48BB78", "#4299E1", "#F56565", "#9F7AEA"]
  const [dateRange, setDateRange] = useState(plottedData.length - 1)
  const [avgData, setAvgData] = useState([])

  dataArr.map((item) => {
    chartData.push({
      id: item[1].date,
      degraded: false,
      date: moment.unix(item[1].date).format("YYYY-MM-DD"),
      volume:
        item[1].volume.length > 0 ? Number(item[1].volume.slice(0, -17)) : 0,
      rentals: item[1].rentals,
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

  const result = [mapData("Volume", "volume"), mapData("Rentals", "rentals")]
  const rentalData = result[result.length - 1]

  const calculateAverages = (partial) => {
    const validLength = partial.length
    const sum = {
      volume: partial.reduce((acc, cur) => acc + cur.volume, 0),
      rentals: partial.reduce((acc, cur) => acc + cur.rentals, 0),
    }

    const value = {
      volume: Math.round(sum.volume / validLength),
      rentals: Math.round(sum.rentals / validLength),
    }

    const map = [
      { id: "Volume", value: value.volume },
      { id: "Rentals", value: value.rentals },
    ].sort((a, b) => b.value - a.value)

    return map
  }

  const color = ["#48BB78", "#9F7AEA", "#F56565", "#4299E1"]

  useEffect(() => {
    setAvgData(calculateAverages(partial))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  return (
    <BoxWrapper colSpan={3}>
      <BoxTitle
        name="Rentals Daily"
        date={""}
        avgData={avgData}
        slicedData={partial}
        color={color}
        description="Daily rentals and volume in the last period"
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={chartData.length - 1}
        name="rental_day"
        yesterday={false}
      />
      <LineChart
        data={result}
        color={color}
        name="daily_rental"
        log={true}
        rentalData={rentalData}
      />
    </BoxWrapper>
  )
}

export default RentalDay
