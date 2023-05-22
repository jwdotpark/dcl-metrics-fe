import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import staticUserTimeSpent from "../../../../../public/data/staticUserTimeSpent.json"
import { useState, useEffect, useMemo, useCallback } from "react"
import { isLocal, getEndpoint } from "../../../../lib/data/constant"
import LineChart from "../../../../lib/LineChart"
import DateRangeButton from "../daterange/DateRangeButton"
import { Center, Spinner } from "@chakra-ui/react"
import { lineChartAtom } from "../../../../lib/state/lineChartState"
import { useAtom } from "jotai"
import { plotMissingDataArr } from "../../../../lib/data/chart/chartInfo"

const UserTimeSpent = ({ address, userAddressRes }) => {
  // eslint-disable-next-line no-unused-vars
  const [chartProps, setChartProps] = useAtom(lineChartAtom)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const timeSpentUrl = getEndpoint(`users/${address}/activity/time_spent`)

  const [avgData, setAvgData] = useState(0)
  const [dateRange, setDateRange] = useState(data.length)
  const color = ["#ff5555"]

  const chartData = useMemo(() => {
    return data.map((item) => ({
      date: item.date,
      time_spent: item.time_spent,
    }))
  }, [data])

  const fetchData = useCallback(async () => {
    let url = `/api/server-fetch?url=${timeSpentUrl}&address=${address}&endpoint=${address}/activity/time_spent/`
    let val = []

    if (isLocal) {
      val = plotMissingDataArr(staticUserTimeSpent)
    } else {
      setIsLoading(true)
      try {
        const response = await fetch(url)
        const res = await response.json()
        val = plotMissingDataArr(res.result)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    setData(val)
  }, [timeSpentUrl, address])

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
        id: "Total Time Spent",
        color: "hsl(90, 70%, 50%)",
        data: slicedData.map((item) => ({
          id: item.date,
          x: item.date,
          y: item.time_spent,
        })),
      },
    ],
    [slicedData]
  )

  const validLegnth = useMemo(
    () => chartData.filter((item: any) => item.active_scenes !== 0).length,
    [chartData]
  )

  useEffect(() => {
    setIsLoading(true)
    fetchData()
    setIsLoading(false)
  }, [fetchData])

  useEffect(() => {
    setIsLoading(true)
    const data = slicedData
    const sum = slicedData.reduce((acc, cur) => acc + cur.time_spent, 0)
    const result = Math.floor(sum / data.length)
    setAvgData(result)
    setIsLoading(false)
  }, [dateRange, slicedData])

  useEffect(() => {
    setIsLoading(true)
    setDateRange(data.length)
    setIsLoading(false)
  }, [data.length])

  return (
    <BoxWrapper colSpan={[1, 1, 1, 4, 3]}>
      <BoxTitle
        name={`User Time Spent`}
        description={`Historical data that represents the amount of time ${userAddressRes.name} spent`}
        date=""
        avgData={avgData}
        slicedData={slicedData}
        color={color}
        line={false}
        setLine={{}}
      />
      {data.length !== 0 ? (
        <>
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
        </>
      ) : (
        <Center h={chartProps.height}>No Data</Center>
      )}
    </BoxWrapper>
  )
}

export default UserTimeSpent
