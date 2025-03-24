/* eslint-disable react-hooks/rules-of-hooks */
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
  transformChartData,
  transformToTitleCase,
} from "../../../lib/data/chart/chartHelper"
import useSWR from "swr"
import { format } from "date-fns"
import { SceneChartTooltip } from "./partials/chart/SceneChartToolTip"
import { ChartParameters } from "./partials/chart/ChartParameters"
import { chartFormat } from "../../../lib/data/chart/chartInfo"

const SceneCharts = ({ sceneRes, pageIndex }) => {
  const AxisFontColor = useColorModeValue("#000", "#fff")

  const data = sceneRes.slice(pageIndex * 10, pageIndex * 10 + 10)

  const [chartHeight, setChartHeight] = useState(350)

  const [option, setOption] = useState({
    dateRange: 60,
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
  console.log("fetchedData", fetchedData)

  const sortedData =
    fetchedData &&
    transformChartData(fetchedData.result, useColorModeValue("light", "dark"))

  const [visibleLines, setVisibleLines] = useState(
    sceneNames.reduce((acc, name) => {
      acc[name] = true
      return acc
    }, {})
  )

  const resetVisibleLines = () => {
    setVisibleLines(
      sceneNames.reduce((acc, name) => {
        acc[name] = true
        return acc
      }, {})
    )
  }

  useEffect(() => {
    const newUuids = sceneRes
      .slice(pageIndex * 10, pageIndex * 10 + 10)
      .map((d) => d.uuid)
      .join(",")
    setOption((prevOption) => ({
      ...prevOption,
      uuids: newUuids,
    }))

    setVisibleLines(
      sceneNames.reduce((acc, name) => {
        acc[name] = true
        return acc
      }, {})
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, sceneRes])

  const handleLegendClick = (val) => {
    setVisibleLines((prevState) => ({
      ...prevState,
      [val.dataKey]: !prevState[val.dataKey],
    }))
  }

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
        <PlainBoxTitle
          name={`Top ${pageIndex * 10 + 1}-${
            pageIndex * 10 + 10
          } Scenes ${transformToTitleCase(option.metric)}`}
          description={`Selected top 10 scenes's restrospective data for ${option.dateRange} days`}
        />
        <ChartParameters
          option={option}
          setOption={setOption}
          chartHeight={chartHeight}
          setChartHeight={setChartHeight}
          resetVisibleLines={resetVisibleLines}
        />
        {!isLoading && sortedData && !error ? (
          <Box w="100%" h={chartHeight}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sortedData.sortedData}
                margin={{
                  top: 5,
                  right: 20,
                  left: -10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
                <XAxis
                  fontSize={chartFormat.fontSize}
                  dataKey="date"
                  tick={{ fill: AxisFontColor }}
                  tickFormatter={(tick) => {
                    const date = new Date(tick)
                    return format(date, "MM/dd")
                  }}
                  interval={Math.round(option.dateRange / 10)}
                />
                <YAxis
                  fontSize={chartFormat.fontSize}
                  tick={{ fill: AxisFontColor }}
                />
                <Tooltip
                  content={
                    <SceneChartTooltip
                      colorMap={sortedData.sceneColorMap}
                      active={undefined}
                      payload={undefined}
                    />
                  }
                />
                <Legend
                  iconSize={8}
                  wrapperStyle={{ fontSize: "12px", marginLeft: "12px" }}
                  onClick={handleLegendClick}
                />
                {!isLoading &&
                  !error &&
                  sceneNames.map((item) => {
                    return (
                      <Line
                        animationDuration={150}
                        key={item}
                        type="linear"
                        dataKey={item}
                        stroke={sortedData.sceneColorMap[item]}
                        strokeWidth="2px"
                        dot={false}
                        activeDot={true}
                        hide={!visibleLines[item]}
                      />
                    )
                  })}
              </LineChart>
            </ResponsiveContainer>
          </Box>
        ) : (
          <Center w="100%" h={chartHeight}>
            <Spinner />
          </Center>
        )}
      </Box>
    </BoxWrapper>
  )
}

export default SceneCharts
