import { Box, Text } from "@chakra-ui/react"
import { ResponsiveBar } from "@nivo/bar"
import ProfilePicture from "../components/local/ProfilePicture"
import { convertSeconds } from "../lib/hooks/utils"
import avatar from "../../public/images/avatar.png"

const BarChart = ({ data, onOpen, value, setValue }) => {
  const min = Math.min(...data.map((d) => d.time_spent))
  const max = Math.max(...data.map((d) => d.time_spent))

  return (
    <ResponsiveBar
      data={data}
      keys={["time_spent"]}
      indexBy="address"
      margin={{ top: 30, right: 30, bottom: 10, left: 110 }}
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
      // barComponent={CustomBarComponent}
    />
  )
}

export default BarChart

const CustomBarComponent = (props) => {
  console.log(props.bar)
  const image = "https://picsum.photos/200"
  return (
    <>
      <svg
        transform={`translate(${props.bar.x}, ${props.bar.y})`}
        onClick={props.onClick}
        // onMouseEnter={props.onMouseEnter}
        // onMouseLeave={props.onMouseLeave}
      >
        <rect
          width={props.bar.width}
          height={props.bar.height}
          fill={props.bar.color}
          rx={props.bar.borderRadius}
          ry={props.bar.borderRadius}
        />

        <text
          // x={props.bar.width / 2}
          // y={props.bar.height / 2}
          x={200}
          y={20}
          textAnchor="middle"
          dominantBaseline="central"
          fill={props.labelTextColor}
        >
          {/* <image href={image} width={20} height={20} /> */}
          <image href={image} height="200" width="200" x={200} y={20} />
          {props.bar.data.data.address}
        </text>
      </svg>
    </>
  )
}
