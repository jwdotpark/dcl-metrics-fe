import { Box, Center, Spinner } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import BoxTitle from "../../layout/local/BoxTitle"
import LineChart from "../../../lib/LineChart"
import { useState, useEffect, useMemo, useCallback } from "react"
import {
  sliceData,
  chartHeight,
  findFalse,
} from "../../../lib/data/chart/chartInfo"
import {
  generateChartData,
  calculateAverages,
  mapChartData,
} from "../../../lib/data/chart/chartHelper"
import BottomLegend from "./partial/BottomLegend"

const OnlineUsers = () => {
  const [data, setData] = useState<any>([])
  const chartKeys = useMemo(() => ["online_users"], [])
  const [isLoading, setIsLoading] = useState(false)
  const color = useMemo(() => ["#9ccfd8"], [])
  const [avgData, setAvgData] = useState([])
  const [avgColor, setAvgColor] = useState(color)

  const fetchData = async () => {
    setIsLoading(true)
    const url = "https://public-metrics.decentraland.org/onlineUsers30d"
    const res = await fetch(`/api/client-fetch?url=${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
    const data = await res.json()
    const dataArr = data.result && data.result.data.result[0].values
    setIsLoading(false)
    setData(dataArr)
  }

  const chartData = useMemo(
    () => generateChartData(data, chartKeys),
    [data, chartKeys]
  )

  const partial = useMemo(
    () => sliceData(chartData, data.length - 1),
    [chartData, data.length]
  )

  const mappedChartData = useMemo(
    () => mapChartData("Online Users", "online_users", partial),
    [partial]
  )

  const generateResultData = useCallback(() => {
    const mappedResult = [mappedChartData]
    mappedResult.forEach((item: any, i: number) => {
      item.color = color[i]
    })

    return mappedResult
  }, [color, mappedChartData])

  const result = useMemo(() => generateResultData(), [generateResultData])
  const lineVisibility = useMemo(() => result.map(() => true), [result])

  const [line, setLine] = useState(lineVisibility)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setAvgData(calculateAverages(partial, chartKeys))
  }, [partial, chartKeys])

  useEffect(() => {
    const res = findFalse(line)
    const newAvgColor = color.map((item, i) =>
      res.includes(i.toString()) ? "gray.400" : item
    )

    setAvgColor(newAvgColor)
  }, [color, line])

  return (
    <BoxWrapper colSpan={3}>
      <Box data-testid="onlineUsers">
        <BoxTitle
          name={`Online Users`}
          date={""}
          avgData={avgData}
          slicedData={{}}
          color={color}
          description={`Active daily users, data from Decentraland Status Page`}
          line={line}
          setLine={setLine}
        />
        <Box>
          {!isLoading ? (
            <>
              <LineChart
                data={result}
                color={color}
                name="onlineUsers"
                avgData={avgData}
                avgColor={avgColor}
                line={line}
                rentalData={undefined}
              />
              <BottomLegend
                description="UTC, source from"
                link="https://status.decentraland.org/metrics"
              />
            </>
          ) : (
            <Center h={chartHeight}>
              <Spinner />
            </Center>
          )}
        </Box>
      </Box>
    </BoxWrapper>
  )
}

export default OnlineUsers
