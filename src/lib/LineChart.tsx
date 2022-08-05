// @ts-nocheck
import { ResponsiveLine } from "@nivo/line"
import { useColorModeValue } from "@chakra-ui/react"

const LineChart = ({ data }) => {
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

  const min = Math.min(...data[0].data.map((item) => item.y))
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 40, bottom: 50, left: 80 }}
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
      theme={{
        textColor: useColorModeValue("gray.800", "white"),
      }}
      pointSize={6}
      pointColor={{ theme: "background" }}
      pointBorderWidth={6}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
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
