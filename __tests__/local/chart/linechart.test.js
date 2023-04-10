import { render } from "@testing-library/react"
import LineChart from "../../../src/lib/LineChart"
import {
  lineChartData,
  lineChartRentalData,
  lineChartAvgColor,
  lineChartAvgData,
} from "../../utils/mocks"

global.ResizeObserver = require("resize-observer-polyfill")

describe("LineChart", () => {
  it("should render without crashing", () => {
    render(
      <LineChart
        data={lineChartData}
        rentalData={lineChartRentalData}
        avgData={lineChartAvgData}
        avgColor={lineChartAvgColor}
        line={false}
      />
    )
  })
})
