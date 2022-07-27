// @ts-nocheck
import { ResponsiveLine } from "@nivo/line"

const LineChart = ({ data, min }) => {
  const colors = [
    "#F5656575",
    "#F5656575",
    "#48BB7875",
    "#4299e175",
    "#9F7AEA75",
    "#ED64A675",
    "#E5581275",
    "#0E474975",
  ]

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 60, bottom: 100, left: 80 }}
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
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -60,
        legendPosition: "middle",
      }}
      pointSize={6}
      pointColor={{ theme: "background" }}
      pointBorderWidth={6}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: true,
          translateX: 0,
          translateY: 75,
          itemsSpacing: 20,
          itemDirection: "left-to-right",
          itemWidth: 85,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "square",
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
      tooltip={(point) => {
        return (
          <div
            style={{
              background: "white",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              padding: ".3rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <div>
              {point.point.data.x + ", " + point.point.data.yStacked} counts
            </div>
          </div>
        )
      }}
      colors={() => colors[Math.floor(Math.random() * colors.length)]}
      enableArea={true}
      areaBaselineValue={min}
      areaOpacity={0.5}
    />
  )
}

export default LineChart
