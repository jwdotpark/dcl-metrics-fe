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
      margin={{ top: 10, right: 30, bottom: 10, left: 70 }}
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
      // onClick={(e) => {
      //   // @ts-ignore
      //   navigator.clipboard.writeText(e.indexValue)
      //   alert("Address " + e.indexValue + " is copied to clipboard!")
      // }}
      onClick={onOpen}
      onMouseEnter={(point) => {
        // @ts-ignore
        setValue(point)
      }}
      animate={false}
      tooltip={(point) => {
        return (
          <div
          // style={{
          //   background: "white",
          //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          //   padding: ".5rem",
          //   border: "1px solid #ccc",
          //   borderRadius: "5px",
          // }}
          >
            {/* <div>
            <ProfilePicture address={point.data.address} />
            Users spent{" "}
            <strong>
              {" "}
              {convertSeconds(Number(point.data.time_spent))}
            </strong>{" "}
            <br />
            Click to copy address to clipboard
            <br />
            <code>{point.data.address.toString().slice(0, 28) + ".. "}</code>
          </div> */}
          </div>
        )
      }}
    />
  )
}

export default BarChart
