/* eslint-disable react-hooks/exhaustive-deps */
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import staticUserTimeSpent from "../../../../../public/data/staticUserTimeSpent.json"
import { useState, useEffect } from "react"
import {
  isProd,
  isDev,
  isLocal,
  getEndpoint,
} from "../../../../lib/data/constant"
import LineChart from "../../../../lib/LineChart"
import DateRangeButton from "../daterange/DateRangeButton"
import { Center, Spinner } from "@chakra-ui/react"
import { lineChartAtom } from "../../../../lib/state/lineChartState"
import { useAtom } from "jotai"

const UserTimeSpent = ({ address, userAddressRes }) => {
  const [chartProps, setChartProps] = useAtom(lineChartAtom)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const timeSpentUrl = getEndpoint(`users/${address}/activity/time_spent`)

  const [avgData, setAvgData] = useState(0)
  const [dateRange, setDateRange] = useState(data.length)
  const color = ["#6272a4"]

  let chartData = []

  data.map((item) => {
    chartData.push({
      date: item.date,
      time_spent: item.time_spent,
    })
  })

  const plotMissingDataArr = (data) => {
    const minDate = new Date(Math.min(...data.map((d) => new Date(d.date))))
    const maxDate = new Date(Math.max(...data.map((d) => new Date(d.date))))
    const dateRange = []
    for (let d = minDate; d <= maxDate; d.setDate(d.getDate() + 1)) {
      dateRange.push(new Date(d))
    }

    const dataByDate = {}
    for (const d of data) {
      dataByDate[d.date] = d
    }

    const plotData = []
    for (const date of dateRange) {
      const dateString = date.toISOString().slice(0, 10)
      const time_spent = dataByDate[dateString]?.time_spent ?? 0
      plotData.push({ date: dateString, time_spent })
    }

    return plotData
  }

  const slicedData = () => {
    if (chartData.length - dateRange > 0) {
      return chartData.slice(chartData.length - dateRange, chartData.length)
    } else {
      return chartData
    }
  }

  const result = [
    {
      id: "Total Time Spent",
      color: "hsl(90, 70%, 50%)",
      data: slicedData().map((item) => ({
        id: item.date,
        x: item.date,
        y: item.time_spent,
      })),
    },
  ]

  const validLegnth = chartData.filter(
    (item) => item.active_scenes !== 0
  ).length

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const url = `/api/server-fetch?url=${timeSpentUrl}&address=${address}&endpoint=${address}/activity/time_spent/`
      if (isProd) {
        const response = await fetch(url)
        const res = await response.json()
        setData(res.result)
      } else if (isDev && !isLocal) {
        const response = await fetch(url)
        const res = await response.json()
        setData(res.result)
      } else if (isLocal) {
        setData(plotMissingDataArr(staticUserTimeSpent))
      }
    }
    fetchData()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const data = slicedData()
    const sum = slicedData().reduce((acc, cur) => acc + cur.time_spent, 0)
    const result = Math.floor(sum / data.length)
    setAvgData(result)
  }, [dateRange])

  useEffect(() => {
    setDateRange(data.length)
  }, [data.length])

  return (
    <BoxWrapper colSpan={[1, 1, 1, 4, 3]}>
      <BoxTitle
        name={`User Time Spent`}
        description={`Historical data that represents the amount of time ${userAddressRes.name} spent`}
        date=""
        avgData={avgData}
        slicedData={slicedData()}
        color={color}
        line={false}
        setLine={{}}
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={validLegnth}
        name=""
        yesterday={false}
      />
      {!isLoading ? (
        <LineChart
          data={result}
          color={color}
          name="userTimeSpent"
          avgColor={undefined}
          line={undefined}
          rentalData={false}
          avgData={[]}
        />
      ) : (
        <Center h={chartProps.height}>
          <Spinner />
        </Center>
      )}
    </BoxWrapper>
  )
}

export default UserTimeSpent
