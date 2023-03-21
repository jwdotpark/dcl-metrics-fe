import { Box, Flex, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import LineChart from "../../../../lib/LineChart"
import BoxTitle from "../../../layout/local/BoxTitle"
import SceneTitle from "../../../layout/local/SceneTitle"
import DateRangeButton from "../daterange/DateRangeButton"
import moment from "moment"
import { dateFormat } from "../../../../lib/data/chartInfo"

const SceneUserLineChart = ({ data, name }) => {
  const [avgData, setAvgData] = useState(0)
  const [dateRange, setDateRange] = useState<number>(data.length)
  const userData = data && Object.entries(data)
  const color = "rgba(80, 150, 123)"

  const chartData = []
  userData.map((item) => {
    chartData.push({
      // @ts-ignore
      date: item[1].date,
      // @ts-ignore
      visitors: item[1].visitors,
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
      id: "Unique Visitors",
      color: "hsl(90, 70%, 50%)",
      data: slicedData().map((item) => ({
        id: item.date,
        x: item.date,
        y: item.visitors,
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
          p="2"
          bg={useColorModeValue("gray.50", "gray.900")}
          border="1px solid"
          borderColor={useColorModeValue("gray.100", "gray.700")}
          borderRadius="xl"
          shadow="md"
        >
          <BoxTitle
            name={`Unique Visitors`}
            description="The number of unique visitors in the last period"
            date={""}
            avgData={[]}
            slicedData={{}}
            color=""
            line={undefined}
            setLine={undefined}
          />
          <DateRangeButton
            dateRange={dateRange}
            setDateRange={setDateRange}
            validLegnth={validLegnth}
            name=""
            yesterday={false}
          />
          <LineChart
            data={result}
            color={color}
            name="sceneUserLineChart"
            rentalData={false}
            avgData={[]}
            avgColor={undefined}
            line={undefined}
          />
        </Box>
      </Box>
    </Flex>
  )
}

export default SceneUserLineChart
