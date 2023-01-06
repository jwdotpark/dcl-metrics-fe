// @ts-nocheck
import { useEffect, useState } from "react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import { defaultDateRange, sliceData, date } from "../../../lib/data/chartInfo"
import BoxTitle from "../../layout/local/BoxTitle"
import DateRangeButton from "./daterange/DateRangeButton"
import LineChart from "../../../lib/LineChart"

// active_parcels
const UniqueVisitedParcels = ({ data }) => {
  const dataArr = Object.entries(data)
  const chartData = []
  const color = ["#CAB2D6FF"]
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [avgData, setAvgData] = useState([])

  dataArr.map((item) => {
    chartData.push({
      id: item[0],
      date: item[0],
      active_parcels: item[1].active_parcels,
      degraded: item[1].degraded,
    })
  })

  const partial = sliceData(chartData, dateRange)
  const dateString = date(chartData, dateRange).date

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

  const result = [mapData("Parcel Visitors", "active_parcels")]

  const calculateAverages = (partial) => {
    const validLength = partial.length
    const sum = {
      active_parcels: partial.reduce((acc, cur) => acc + cur.active_parcels, 0),
    }
    const value = {
      active_parcels: Math.floor(sum.active_parcels / validLength),
    }
    const map = [{ id: "Average Value", value: value.active_parcels }]
    return map
  }

  useEffect(() => {
    setAvgData(calculateAverages(partial))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  return (
    <BoxWrapper>
      <BoxTitle
        name="Parcel Visitors"
        date={dateString}
        avgData={avgData}
        slicedData={partial}
        color={color}
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="global_parcels_visited"
      />
      <LineChart data={result} color={color} name="uniqueVisitors" />
    </BoxWrapper>
  )
}

export default UniqueVisitedParcels
