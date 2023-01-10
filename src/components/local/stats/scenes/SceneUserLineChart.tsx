/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Text, Spacer, useColorModeValue } from "@chakra-ui/react"
import moment from "moment"
import { useEffect, useState } from "react"
import LineChart from "../../../../lib/LineChart"
import { dateFormat } from "../../../../lib/data/chartInfo"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import SceneTitle from "../../../layout/local/SceneTitle"
import GridBox from "../../GridBox"
import LineChartDateRange from "../daterange/LineChartDateRange"
import AvgStat from "../partials/AvgStat"
import DateRangeButton from "../daterange/DateRangeButton"

const SceneUserLineChart = ({ data }) => {
  const [avgData, setAvgData] = useState(0)
  const [dateRange, setDateRange] = useState<number>(30)
  const userData = data && Object.entries(data)
  const color = "rgba(80, 150, 123)"

  const chartData = []
  userData.map((item) => {
    chartData.push({
      date: item[0],
      users: item[1],
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
      color: "hsl(90, 70%, 50%)",
      data: slicedData().map((item) => ({
        id: item.date,
        x: item.date,
        y: item.users,
      })),
    },
  ]

  const validLegnth = chartData.filter(
    (item) => item.active_scenes !== 0
  ).length

  // grab the lastest from data
  const date = moment(result[0].data[result[0].data.length - 1].x).format(
    dateFormat
  )

  useEffect(() => {
    const data = slicedData()
    const sum = slicedData().reduce((acc, cur) => acc + cur.users, 0)
    const result = Math.floor(sum / data.length)
    setAvgData(result)
  }, [dateRange])

  return (
    <Flex
      sx={{
        "& > * + *": {
          ml: [0, 0, 0, 4],
          mt: [4, 4, 4, 0],
        },
      }}
      direction={["column", "column", "column", "row"]}
      w="100%"
      h="auto"
      mb="4"
    >
      <Box w="100%" pt="4" px="4">
        <Box
          border="1px solid"
          borderColor={useColorModeValue("gray.100", "gray.600")}
          borderRadius="xl"
        >
          <SceneTitle
            name="Unique Scene Visitors"
            date={date}
            dateForPicker=""
            setDate=""
            availableDate={false}
            hasMultipleScenes={true}
          />

          <DateRangeButton
            dateRange={dateRange}
            setDateRange={setDateRange}
            validLegnth={validLegnth}
            name=""
            yesterday={false}
          />
          <LineChart data={result} color={color} name="sceneUserLineChart" />
        </Box>
      </Box>
    </Flex>
  )
}

export default SceneUserLineChart
