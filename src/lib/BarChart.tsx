import { ResponsiveBar } from "@nivo/bar"
import { convertSeconds } from "../lib/hooks/utils"

const BarChart = ({ data, onOpen, value, setValue }) => {
  const min = Math.min(...data.map((d) => d.time_spent))
  const max = Math.max(...data.map((d) => d.time_spent))

  return (
    <ResponsiveBar
      data={data}
      keys={["time_spent"]}
      indexBy="address"
      margin={{ top: 10, right: 30, bottom: 10, left: 110 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      colorBy="indexValue"
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      role="application"
      ariaLabel="bar chart"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }}
      onClick={onOpen}
      onMouseEnter={(point) => {
        // @ts-ignore
        setValue(point)
      }}
      animate={false}
      axisLeft={{
        format: (value) => convertSeconds(value),
      }}
      enableLabel={true}
      valueFormat={(value) => convertSeconds(value)}
      minValue={min}
      maxValue={max}
      // axisTop={{
      //   tickSize: 5,
      //   tickPadding: 2,
      //   tickRotation: 1,
      //   legend: "",
      //   legendPosition: "middle",
      //   legendOffset: 0,
      //   renderTick: ({
      //     textAnchor,
      //     textBaseline,
      //     textX,
      //     textY,
      //     value,
      //     x,
      //     y,
      //   }) => {
      //     return (
      //       <g transform={`translate(${x},${y})`}>
      //         <text
      //           // alignmentBaseline={textBaseline}
      //           textAnchor={textAnchor}
      //           transform={`translate(${textX},${textY})`}
      //         >
      //           <ProfilePicture address={value} modal={false} />
      //         </text>
      //       </g>
      //     )
      //   },
      // }}
    />
  )
}

export default BarChart
