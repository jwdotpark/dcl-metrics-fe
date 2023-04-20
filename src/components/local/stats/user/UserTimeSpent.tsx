import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import staticUserTimeSpent from "../../../../../public/data/staticUserTimeSpent.json"
import { useState, useEffect } from "react"
import { isProd, isDev } from "../../../../lib/data/constant"
import LineChart from "../../../../lib/LineChart"
import DateRangeButton from "../daterange/DateRangeButton"

const UserTimeSpent = ({ address }) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const timeSpentUrl = `https://api.dcl-metrics.com/users/${address}/activity/time_spent`

  const [avgData, setAvgData] = useState(0)
  const [dateRange, setDateRange] = useState<number>(data.length)
  const color = "rgba(80, 150, 123)"

  let chartData = []

  data.map((item) => {
    chartData.push({
      date: item.date,
      time_spent: item.time_spent,
      //date: item.date,
      //timeSpent: item.time_spent,
    })
  })

  const slicedData = () => {
    if (chartData.length - dateRange > 0) {
      return chartData.slice(chartData.length - dateRange, chartData.length)
    } else {
      return chartData
    }
  }

  const result = [
    {
      id: "User Time Spent",
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
    const data = slicedData()
    const sum = slicedData().reduce((acc, cur) => acc + cur.users, 0)
    const result = Math.floor(sum / data.length)
    setAvgData(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      //if (isProd || isDev) {
      if (false) {
        const url = `/api/server-fetch?url=${timeSpentUrl}&address=${address}&endpoint=${address}/activity/time_spent/`
        const response = await fetch(url)
        const res = await response.json()
        setData(res.result)
      } else {
        console.log("og", staticUserTimeSpent)
        setData(staticUserTimeSpent)
        console.log("after data", data)
      }
    }
    fetchData()
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BoxWrapper colSpan={3}>
      <BoxTitle
        name="User Time Spent"
        description={`User Time Spent description`}
        date=""
        avgData={avgData}
        slicedData={[]}
        color={color}
        line={false}
        setLine={{}}
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={[]}
        name=""
        yesterday={false}
      />
      <LineChart
        data={result}
        color={color}
        name="userTimeSpent"
        avgColor={undefined}
        line={undefined}
        rentalData={false}
        avgData={[]}
      />
    </BoxWrapper>
  )
}

export default UserTimeSpent
