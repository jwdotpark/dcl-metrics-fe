/* eslint-disable react-hooks/exhaustive-deps */
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import staticUserScenesVisited from "../../../../../public/data/staticUserScenesVisited.json"
import { useState, useEffect, useMemo, useCallback } from "react"
import { isLocal, getEndpoint } from "../../../../lib/data/constant"
import LineChart from "../../../../lib/LineChart"
import DateRangeButton from "../daterange/DateRangeButton"
import { Text, Center, Spinner } from "@chakra-ui/react"
import { lineChartAtom } from "../../../../lib/state/lineChartState"
import { useAtom } from "jotai"

const UserScenesVisited = ({ address, userAddressRes }) => {
  // eslint-disable-next-line no-unused-vars
  const [chartProps, setChartProps] = useAtom(lineChartAtom)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const scenesVisitedUrl = getEndpoint(
    `users/${address}/activity/scenes_visited`
  )

  const [avgData, setAvgData] = useState(0)
  const [dateRange, setDateRange] = useState(data.length)
  const color = ["#ff79c6"]

  const chartData = useMemo(() => {
    return data.map((item) => ({
      date: item.date,
      count: item.count,
    }))
  }, [data])

  const plotMissingDataArr = useCallback((data) => {
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
      const count = dataByDate[dateString]?.count ?? 0
      plotData.push({ date: dateString, count })
    }

    return plotData
  }, [])

  const fetchData = useCallback(async () => {
    let url = `/api/server-fetch?url=${scenesVisitedUrl}&address=${address}&endpoint=${address}/activity/scenes_visited/`

    if (isLocal) {
      setData(plotMissingDataArr(staticUserScenesVisited))
    } else {
      setIsLoading(true)
      try {
        const response = await fetch(url)
        const res = await response.json()
        setData(plotMissingDataArr(res.result))
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [scenesVisitedUrl, address, plotMissingDataArr])

  const slicedData = useMemo(() => {
    if (chartData.length - dateRange > 0) {
      return chartData.slice(chartData.length - dateRange, chartData.length)
    } else {
      return chartData
    }
  }, [chartData, dateRange])

  const result = useMemo(
    () => [
      {
        id: "Number of Scenes Visited",
        color: "hsl(90, 70%, 50%)",
        data: slicedData.map((item) => ({
          id: item.date,
          x: item.date,
          y: item.count,
        })),
      },
    ],
    [slicedData]
  )

  const validLength = useMemo(() => {
    return chartData.filter((item: any) => item.active_scenes !== 0).length
  }, [chartData])

  useEffect(() => {
    setIsLoading(true)
    fetchData()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const sum = slicedData.reduce((acc, cur) => acc + cur.count, 0)
    const average = sum / slicedData.length
    setAvgData(average)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, slicedData])

  useEffect(() => {
    setIsLoading(true)
    setDateRange(data.length)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length])

  let chartComponent: JSX.Element

  if (data.length !== 0) {
    if (isLoading) {
      chartComponent = (
        <Center h={chartProps.height}>
          <Spinner />
        </Center>
      )
    } else {
      chartComponent = (
        <LineChart
          data={result}
          color={color}
          name="userScenesVisited"
          avgColor={undefined}
          line={undefined}
          rentalData={false}
          avgData={[]}
        />
      )
    }
  } else {
    chartComponent = (
      <Center h={chartProps.height}>
        <Text>No Data</Text>
      </Center>
    )
  }

  return (
    <BoxWrapper colSpan={[1, 1, 1, 4, 3]}>
      <BoxTitle
        name={`User Scenes Visited`}
        description={`The number of the scene ${userAddressRes.name} visited`}
        date=""
        avgData={avgData}
        slicedData={slicedData}
        color={color}
        line={false}
        setLine={{}}
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={validLength}
        name=""
        yesterday={false}
      />
      {chartComponent}
    </BoxWrapper>
  )
}

export default UserScenesVisited
