import { Box, Center, Spinner, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getEndpoint } from "../../../lib/data/constant"
import BoxWrapper from "../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../layout/local/PlainBoxTitle"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  getThemeColor,
  transformChartData,
} from "../../../lib/data/chart/chartHelper"
import useSWR from "swr"
import { format } from "date-fns"
import { SceneChartTooltip } from "./partials/chart/SceneChartToolTip"

const SceneCharts = ({ sceneRes, pageIndex }) => {
  const AxisFontColor = useColorModeValue("#000", "#fff")

  const data = sceneRes.slice(pageIndex * 10, pageIndex * 10 + 10)

  const [option, setOption] = useState({
    dateRange: 30,
    uuids: data.map((d) => d.uuid).join(","),
    metric: "total_visitors",
  })

  const sceneNames = data.map((d) => d.name)

  const fetcher = async (url) => {
    const res = await fetch(url)
    return res.json()
  }

  const targetUrl = `/api/chart-data?url=${getEndpoint(
    `scenes/compare`
  )}&range=${option.dateRange}&uuids=${option.uuids}&metric=${option.metric}`

  const { data: fetchedData, isLoading, error } = useSWR(targetUrl, fetcher)

  const sortedData = fetchedData && transformChartData(fetchedData.result)

  useEffect(() => {
    const newUuids = sceneRes
      .slice(pageIndex * 10, pageIndex * 10 + 10)
      .map((d) => d.uuid)
      .join(",")
    setOption((prevOption) => ({
      ...prevOption,
      uuids: newUuids,
    }))
  }, [pageIndex, sceneRes])

  return (
    <BoxWrapper colSpan={6}>
      <Box
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        overflowY="auto"
        pb="4"
      >
        <PlainBoxTitle name="Top 10 Scenes Chart" description="description" />
        {!isLoading && sortedData && !error ? (
          <Box w="100%" h="350px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sortedData}
                margin={{
                  top: 5,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
                <XAxis
                  fontSize="10px"
                  style={{
                    fontWeight: "medium",
                  }}
                  dataKey="date"
                  tick={{ fill: AxisFontColor }}
                  tickFormatter={(tick) => {
                    const date = new Date(tick)
                    return format(date, "MM/dd")
                  }}
                />
                <YAxis
                  fontSize="10px"
                  style={{
                    fontWeight: "medium",
                  }}
                  tick={{ fill: AxisFontColor }}
                />
                <Tooltip
                  content={
                    <SceneChartTooltip active={undefined} payload={undefined} />
                  }
                />
                <Legend iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
                {!isLoading &&
                  !error &&
                  sceneNames.map((item) => {
                    return (
                      <Line
                        animationDuration={150}
                        connectNulls
                        key={item}
                        type="linear"
                        dataKey={item}
                        stroke={getThemeColor(
                          // eslint-disable-next-line react-hooks/rules-of-hooks
                          useColorModeValue("light", "dark")
                        )}
                        strokeWidth="2px"
                        dot={false}
                        activeDot={true}
                      />
                    )
                  })}
              </LineChart>
            </ResponsiveContainer>
          </Box>
        ) : (
          <Center w="100%" h="350px">
            <Spinner />
          </Center>
        )}
      </Box>
    </BoxWrapper>
  )
}

export default SceneCharts
