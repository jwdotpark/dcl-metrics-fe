import { ResponsiveBar } from "@nivo/bar"
import { convertSeconds } from "./hooks/utils"

const BarChart = ({ data }) => {
  const mutatedData = data.map((item) => {
    return {
      address: item[0],
      time_spent: item[1],
    }
  })

  return (
    <ResponsiveBar
      maxValue={200000}
      data={mutatedData}
      keys={["time_spent"]}
      indexBy="address"
      margin={{ top: 10, right: 30, bottom: 6, left: 70 }}
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
}

export default BarChart
