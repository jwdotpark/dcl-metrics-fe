// @ts-nocheck
import {
  Box,
  Center,
  useBreakpointValue,
  Tooltip,
  useColorModeValue,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react"
import { ResponsiveLine } from "@nivo/line"
import { useMemo } from "react"
import { SceneColor } from "./hooks/utils"

const MultiLineChart = ({ res, selectedScene }) => {
  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  })

  const lineOpacity = 0.2

  const setColor = (index) => {
    const color =
      SceneColor[index]
        .toString()
        .substring(0, SceneColor[index].toString().length - 1) +
      ", " +
      lineOpacity +
      ")"
    return color
  }

  const data = res.map((item, i) => {
    return {
      id: item.name,
      color: setColor(i),
      data: item.map((item) => {
        return {
          x: item[0],
          y: item[1],
        }
      }),
    }
  })

  const memoizedData = useMemo(() => data, [data])

  const colors = data.map((item) => item.color)
  colors[selectedScene] = colors[selectedScene].replace(lineOpacity, "1")

  const yAxisLabel = (value) => {
    if (value % 2 !== 0) {
      return ""
    }
    return value + "h"
  }

  const yAxisLabelDegree = isMobile ? 90 : 0
  const currentScene = memoizedData[selectedScene]

  const currentMax = Math.max.apply(
    Math,
    currentScene.data.map((item) => item.y)
  )

  const currentMin = Math.min.apply(
    Math,
    currentScene.data.map((item) => item.y)
  )

  return (
    <Tooltip
      p="2"
      fontSize="sm"
      borderRadius="md"
      shadow="xl"
      hasArrow
      label="This chart shows the number of users and the time that user stayed in the scene"
      placement="auto"
    >
      <Box
        h="435px"
        mt={[2, 2, 6, 0]}
        pt="4"
        bg={useColorModeValue("gray.100", "gray.700")}
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        shadow="md"
      >
        <ResponsiveLine
          data={memoizedData}
          colors={colors}
          margin={{ top: 30, right: 20, bottom: 60, left: 50 }}
          xScale={{ type: "linear" }}
          yScale={{
            type: "linear",
            min: currentMin,
            max: currentMax,
            stacked: false,
            reverse: false,
            clamp: "auto",
          }}
          yFormat=" >-.2f"
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Time spent in hours",
            legendOffset: 40,
            legendPosition: "middle",
            format: (value) => yAxisLabel(value),
            tickRotation: yAxisLabelDegree,
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 0,
            tickRotation: 0,
            legend: "Numer of Users",
            legendOffset: 10,
            legendPosition: "end",
          }}
          pointSize={10}
          pointBorderWidth={2}
          pointLabelYOffset={-12}
          useMesh={true}
          curve="basis"
          enablePoints={false}
          theme={{
            textColor: useColorModeValue("black", "white"),
            fontSize: 12,
            grid: {
              line: {
                stroke: "gray",
                opacity: 0.25,
                strokeDasharray: "1 1",
              },
            },
          }}
          enableArea={true}
          animate={true}
          areaOpacity={0.4}
          legends={[
            {
              dataFrom: "id",
              data: memoizedData.map((id, index) => ({
                color: colors[index],
                id,
                label:
                  String(memoizedData.map((item) => item.id)[index]).length > 25
                    ? String(memoizedData.map((item) => item.id)[index]).slice(
                        0,
                        25
                      ) + ".."
                    : String(memoizedData.map((item) => item.id)[index]),
              })),
              anchor: "top-right",
              direction: "column",
              justify: false,
              translateX: 0,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "right-to-left",
              itemWidth: 100,
              itemHeight: 24,
              itemOpacity: 1,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              itemTextColor: useColorModeValue("#000", "#fff"),
            },
          ]}
          enableSlices="x"
          sliceTooltip={({ slice }) => {
            return (
              <Box
                key={slice.points[0].data.xFormatted}
                sx={{ backdropFilter: "blur(20px)" }}
                p="2"
                // eslint-disable-next-line react-hooks/rules-of-hooks
                color={useColorModeValue("black", "white")}
                borderRadius="xl"
                shadow="md"
              >
                <Box size="sm" variant="simple">
                  <Box fontSize="sm">
                    <Center
                      mb="2"
                      borderColor="#2D374850"
                      borderBottom="1px dotted"
                    >
                      <Text fontSize="sm" fontWeight="bold">
                        {slice.points[0].data.xFormatted} hr
                      </Text>
                    </Center>
                    <Flex mb="2">
                      <Box>Scene Name</Box>
                      <Spacer />
                      <Box isNumeric>Number of Users</Box>
                    </Flex>
                  </Box>

                  {slice.points
                    .slice(0)
                    .reverse()
                    .map((point, i) => (
                      <Box key={i}>
                        <Box>
                          <Flex>
                            <Box
                              sx={{ transform: "translateY(3px)" }}
                              display="inline-block"
                              boxSize="12px"
                              mr="2"
                              bg={point.serieColor}
                              borderRadius="xl"
                            />
                            <Box mr="8">
                              <Text fontSize="sm">{point.serieId}</Text>
                            </Box>
                            <Spacer />
                            <Box
                              sx={{ transform: "translateY(-3px)" }}
                              isNumeric
                            >
                              <Text as="kbd" fontSize="sm" fontWeight="bold">
                                <b>{Number(point.data.yFormatted)}</b>
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            )
          }}
        />
      </Box>
    </Tooltip>
  )
}

export default MultiLineChart
