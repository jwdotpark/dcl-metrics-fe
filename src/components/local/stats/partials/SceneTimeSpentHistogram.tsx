/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import { useMemo } from "react"
import {
  Box,
  useColorModeValue,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react"
import { ResponsiveLine } from "@nivo/line"

const SceneTimeSpentHistogram = ({ data, selectedScene }) => {
  const timeSpentHistogramArr = data.map((item) => item.time_spent_histogram)
  timeSpentHistogramArr.forEach((item, index) => {
    item.name = data[index].name
  })
  return (
    <Box h="300">
      <MyResponsiveLine
        res={timeSpentHistogramArr}
        selectedScene={selectedScene}
      />
    </Box>
  )
}

export default SceneTimeSpentHistogram

const MyResponsiveLine = ({ res, selectedScene }) => {
  const data = res.map((item) => {
    return {
      id: item.name,
      // color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
      data: item.map((item) => {
        return {
          x: item[0],
          y: item[1],
        }
      }),
    }
  })

  // const memoizedData = useMemo(
  //   () => [data[selectedScene]],
  //   [data, selectedScene]
  // )
  const memoizedData = useMemo(() => data, [data])

  const yAxisLabel = (value) => {
    if (value % 2 === 0) {
      return ""
    }
    return value + "h"
  }

  const yAxisLabelDegree = () => {
    if (data[0].data.length > 7) {
      return 45
    } else {
      return 0
    }
  }

  return (
    <ResponsiveLine
      data={memoizedData}
      margin={{ top: 0, right: 20, bottom: 30, left: 40 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "24h",
        legendOffset: -15,
        legendPosition: "middle",
        tickRotation: yAxisLabelDegree(),
        format: (value) => yAxisLabel(value),
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: 10,
        legendPosition: "middle",
      }}
      pointSize={10}
      colors={{ scheme: "set1" }}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      curve="basis"
      enablePoints={false}
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 15,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "right-to-left",
          itemWidth: 100,
          itemHeight: 20,
          itemOpacity: 1,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      enableSlices="x"
      sliceTooltip={({ slice }) => {
        return (
          <Box
            p="2"
            boxShadow="md"
            borderRadius="md"
            // bgColor={useColorModeValue("gray.700", "gray.300")}
            sx={{ backdropFilter: "blur(10px)" }}
            color={useColorModeValue("black", "white")}
          >
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Scene</Th>
                    <Th isNumeric>Count</Th>
                  </Tr>
                </Thead>

                {slice.points.map((point, i) => (
                  <>
                    <Tbody>
                      <Tr>
                        <Td>
                          <Box
                            boxSize="12px"
                            bg={point.serieColor}
                            display="inline-block"
                            mr="2"
                            borderRadius="md"
                          />
                          {point.serieId}
                        </Td>
                        <Td isNumeric>
                          <Text as="kbd">
                            <b>{Number(point.data.yFormatted)}</b>
                          </Text>
                        </Td>
                      </Tr>
                    </Tbody>
                  </>
                ))}
              </Table>
            </TableContainer>
          </Box>
        )
      }}
    />
  )
}
