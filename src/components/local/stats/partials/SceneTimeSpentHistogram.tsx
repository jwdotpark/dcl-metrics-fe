/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck

import { Box } from "@chakra-ui/react"
import { ResponsiveLine } from "@nivo/line"

const SceneTimeSpentHistogram = ({ data }) => {
  const timeSpentHistogramArr = data.map((item) => item.time_spent_histogram)
  timeSpentHistogramArr.forEach((item, index) => {
    item.name = data[index].name
  })
  return (
    <Box h="300">
      <MyResponsiveLine res={timeSpentHistogramArr} />
    </Box>
  )
}

export default SceneTimeSpentHistogram

const MyResponsiveLine = ({ res }) => {
  const data = res.map((item) => {
    return {
      id: item.name,
      color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
      data: item.map((item) => {
        return {
          x: item[0],
          y: item[1],
        }
      }),
    }
  })

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
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
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -50,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      curve="basis"
      enablePoints={false}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 0,
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
    />
  )
}
