import { useColorModeValue } from "@chakra-ui/react"
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
      theme={{
        textColor: useColorModeValue("#1A202C", "#E2E8F0"),
      }}
      valueFormat={(value) => convertSeconds(value)}
      minValue={min}
      maxValue={max}
    />
  )
}

export default BarChart
