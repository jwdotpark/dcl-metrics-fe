import {
  Box,
  useColorModeValue,
  useBreakpointValue,
  Tooltip,
} from "@chakra-ui/react"
import { ResponsiveBar } from "@nivo/bar"
import SceneHistogram from "../../../../../../public/data/scene_histogram.json"
import { SceneColor } from "../../../../../lib/hooks/utils"
import TooltipTable from "../TableTooltip"

const SceneBarChart = ({ selectedScene }) => {
  const chartData = Object.keys(SceneHistogram).map((key) => {
    return {
      hour: key,
      count: SceneHistogram[key],
    }
  })

  const color = SceneColor[selectedScene]
  const opacity = 0.5
  const colorOpacity = color.substring(0, color.length - 1) + `, ${opacity})`

  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  })

  const yAxisLabelDegree = () => {
    if (isMobile) {
      return 90
    } else {
      return 0
    }
  }

  return (
    <Tooltip
      p="4"
      fontSize="sm"
      borderRadius="xl"
      shadow="xl"
      label="This chart shows the number of users that is presented in each hour of the day"
      placement="auto"
    >
      <Box
        w="100%"
        h="400px"
        bg={useColorModeValue("gray.100", "gray.700")}
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        borderRadius="xl"
        shadow="md"
      >
        <ResponsiveBar
          data={chartData}
          keys={["count"]}
          indexBy="hour"
          margin={{
            top: 30,
            right: isMobile ? 5 : 10,
            bottom: isMobile ? 50 : 40,
            left: isMobile ? 40 : 50,
          }}
          borderWidth={2}
          padding={isMobile ? 0.4 : 0.2}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={colorOpacity}
          theme={{
            textColor: useColorModeValue("black", "white"),
            fontSize: isMobile ? 10 : 12,
            grid: {
              line: {
                stroke: "gray",
                opacity: 0.2,
                strokeDasharray: "1 1",
              },
            },
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: yAxisLabelDegree(),
            legend: "",
            legendPosition: "end",
            legendOffset: -15,
            format: (value) => value + ":00",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 0,
            tickRotation: 0,
            legend: "Number of Users",
            legendPosition: "end",
            legendOffset: 5,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={useColorModeValue("#000", "#fff")}
          role="application"
          ariaLabel="scene bar chart"
          barAriaLabel={function (e) {
            return (
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            )
          }}
          tooltip={(e) => {
            return (
              <Box
                sx={{ backdropFilter: "blur(5px)" }}
                pt="2"
                // eslint-disable-next-line react-hooks/rules-of-hooks
                color={useColorModeValue("black", "white")}
                borderRadius="xl"
                shadow="md"
              >
                <TooltipTable
                  bar={true}
                  date={e.indexValue}
                  count={e.value}
                  degraded={false}
                />
              </Box>
            )
          }}
        />
      </Box>
    </Tooltip>
  )
}

export default SceneBarChart
