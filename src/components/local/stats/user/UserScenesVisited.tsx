import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import staticUserScenesVisited from "../../../../../public/data/staticUserScenesVisited.json"
import { useState, useEffect } from "react"
import { isProd, isDev, isLocal } from "../../../../lib/data/constant"
import LineChart from "../../../../lib/LineChart"
import DateRangeButton from "../daterange/DateRangeButton"
import { Center, Spinner } from "@chakra-ui/react"
import { lineChartAtom } from "../../../../lib/state/lineChartState"
import { useAtom } from "jotai"

const UserScenesVisited = ({ address, userAddressRes }) => {
  const [chartProps, setChartProps] = useAtom(lineChartAtom)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const scenesVisitedUrl = `https://api.dcl-metrics.com/users/${address}/activity/scenes_visited`

  const [avgData, setAvgData] = useState(0)
  const [dateRange, setDateRange] = useState(data.length)
  const color = ["#ff79c6"]

  let chartData = []

  data.map((item) => {
    chartData.push({
      date: item.date,
      count: item.count,
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
      const count = dataByDate[dateString]?.count ?? 0
      plotData.push({ date: dateString, count })
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
      id: "Number of Scenes Visited",
      color: "hsl(90, 70%, 50%)",
      data: slicedData().map((item) => ({
        id: item.date,
        x: item.date,
        y: item.count,
      })),
    },
  ]

  const validLegnth = chartData.filter(
    (item) => item.active_scenes !== 0
  ).length

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const url = `/api/server-fetch?url=${scenesVisitedUrl}&address=${address}&endpoint=${address}/activity/scenes_visited/`
      if (isProd) {
        const response = await fetch(url)
        const res = await response.json()
        setData(res.result)
      } else if (isDev) {
        const response = await fetch(url)
        const res = await response.json()
        setData(res.result)
      } else {
        setData(plotMissingDataArr(staticUserScenesVisited))
      }
    }
    fetchData()
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const data = slicedData()
    const sum = slicedData().reduce((acc, cur) => acc + cur.count, 0)
    const result = sum / data.length
    setAvgData(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  useEffect(() => {
    setDateRange(data.length)
  }, [data.length])

  return (
    <BoxWrapper colSpan={3}>
      <BoxTitle
        name={`User Scenes Visited`}
        description={`The number of the scene ${userAddressRes.name} visited`}
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
          name="userScenesVisited"
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

export default UserScenesVisited
