import { ResponsiveBar } from "@nivo/bar"
import { convertSeconds } from "../lib/hooks/utils"
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const dateArr = [
  "2022-07-19",
  "2022-07-20",
  "2022-07-21",
  "2022-07-22",
  "2022-07-23",
  "2022-07-24",
  "2022-07-25",
]

const BarChart = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={["time_spent"]}
    // keys={dateArr}
    indexBy="address"
    margin={{ top: 10, right: 30, bottom: 13, left: 70 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "nivo" }}
    colorBy="indexValue"
    // defs={[
    //   {
    //     id: "dots",
    //     type: "patternDots",
    //     background: "inherit",
    //     color: "#38bcb2",
    //     size: 4,
    //     padding: 1,
    //     stagger: true,
    //   },
    //   {
    //     id: "lines",
    //     type: "patternLines",
    //     background: "inherit",
    //     color: "#eed312",
    //     rotation: -45,
    //     lineWidth: 6,
    //     spacing: 10,
    //   },
    // ]}
    // fill={[
    //   {
    //     match: {
    //       id: "fries",
    //     },
    //     id: "dots",
    //   },
    //   {
    //     match: {
    //       id: "sandwich",
    //     },
    //     id: "lines",
    //   },
    // ]}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    // axisBottom={{
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: 0,
    //   legend: "country",
    //   legendPosition: "middle",
    //   legendOffset: 32,
    // }}
    // axisLeft={{
    //   tickSize: 5,
    //   tickPadding: 5,
    //   tickRotation: 0,
    //   legend: "Count",
    //   legendPosition: "middle",
    //   legendOffset: -40,
    // }}
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
    onClick={(e) => {
      // @ts-ignore
      navigator.clipboard.writeText(e.indexValue)
      alert("Address " + e.indexValue + " is copied to clipboard!")
    }}
    tooltip={(point) => {
      return (
        <div
          style={{
            background: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            padding: ".5rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <div>
            Users spent{" "}
            <strong> {convertSeconds(Number(point.data.time_spent))}</strong>{" "}
            <br />
            Click to the address below
            <br />
            <code>{point.data.address.toString().slice(0, 20) + ".. "}</code>
          </div>
        </div>
      )
    }}
  />
)

export default BarChart
