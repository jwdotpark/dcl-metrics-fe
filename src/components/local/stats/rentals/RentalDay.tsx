import { useState, useEffect, useMemo } from "react"
import { Box } from "@chakra-ui/react"
import { sliceData } from "../../../../lib/data/chartInfo"
import LineChart from "../../../../lib/LineChart"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import DateRangeButton from "../daterange/DateRangeButton"
import { plotMissingDates } from "../../../../lib/data/chartInfo"
import moment from "moment"

const RentalDay = ({ data }) => {
  const { analyticsDayDatas } = data
  const color = useMemo(() => ["#48BB78", "#9F7AEA", "#F56565", "#4299E1"], [])
  const plottedData = useMemo(
    () => plotMissingDates(analyticsDayDatas),
    [analyticsDayDatas]
  )
  const dataArr: any[] = useMemo(
    () => Object.entries(plottedData),
    [plottedData]
  )
  const [dateRange, setDateRange] = useState(plottedData.length - 1)
  const [avgData, setAvgData] = useState([])

  const chartData = useMemo(() => {
    const data = []
    dataArr.forEach((item) => {
      data.push({
        id: item[1].date,
        degraded: false,
        date: moment.unix(item[1].date).format("YYYY-MM-DD"),
        volume:
          item[1].volume.length > 0 ? Number(item[1].volume.slice(0, -17)) : 0,
        rentals: item[1].rentals,
      })
    })
    return data
  }, [dataArr])

  const partial = useMemo(
    () => sliceData(chartData, dateRange),
    [chartData, dateRange]
  )

  const mapData = useMemo(() => {
    return [
      {
        id: "Volume",
        data: partial.map((item) => ({
          x: item.date,
          y: item.volume,
          degraded: item.degraded,
        })),
      },
      {
        id: "Rentals",
        data: partial.map((item) => ({
          x: item.date,
          y: item.rentals,
          degraded: item.degraded,
        })),
      },
    ]
  }, [partial])

  const result = useMemo(() => {
    return mapData.map((item: any, i) => {
      item.color = color[i]
      return item
    })
  }, [mapData, color])

  const lineVisibility = useMemo(
    () => Array(result.length).fill(true),
    [result.length]
  )
  const [line, setLine] = useState(lineVisibility)

  const rentalData = result[result.length - 1]

  const calculateAverages = useMemo(() => {
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
  }, [partial])

  useEffect(() => {
    setAvgData(calculateAverages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  return (
    <BoxWrapper colSpan={[4, 4, 4, 4, 4]}>
      <Box data-testid="rentalDaily">
        <BoxTitle
          name="Rentals Daily"
          date={""}
          avgData={avgData}
          slicedData={partial}
          color={color}
          description="Daily rentals and volume in the last period"
          line={line}
          setLine={setLine}
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
          rentalData={rentalData}
          avgData={avgData}
          avgColor={{}}
          line={{}}
        />
      </Box>
    </BoxWrapper>
  )
}

export default RentalDay
