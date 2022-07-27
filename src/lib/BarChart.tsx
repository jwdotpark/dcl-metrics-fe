import { ResponsiveBar } from "@nivo/bar"
import { setPriority } from "os"
import { useState } from "react"
import ProfilePicture from "../components/local/ProfilePicture"
import { convertSeconds } from "../lib/hooks/utils"
// import ProfilePicture from "../components/local/ProfilePicture"

const BarChart = ({ data, onOpen, value, setValue }) => {
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
      axisTop={null}
      axisRight={null}
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
        console.log(point)
        setValue(point)
      }}
      animate={false}
      axisLeft={{
        format: (value) => convertSeconds(value),
      }}
    />
  )
}

export default BarChart
