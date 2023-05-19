import DateRangeButton from "../../../src/components/local/stats/daterange/DateRangeButton"
import { render, fireEvent } from "@testing-library/react"

describe("DateRangeButton", () => {
  it("renders buttons and calls setDateRange function correctly", () => {
    const setDateRangeMock = jest.fn()

    const { queryAllByText } = render(
      <DateRangeButton
        dateRange={7}
        setDateRange={setDateRangeMock}
        validLegnth={30}
        name="test"
        yesterday={false}
      />
    )

    // force clicking first one
    fireEvent.click(queryAllByText("7d")[0])
    expect(setDateRangeMock).toHaveBeenCalledWith(7)

    fireEvent.click(queryAllByText("14d")[0])
    expect(setDateRangeMock).toHaveBeenCalledWith(14)

    fireEvent.click(queryAllByText("30d")[0])
    expect(setDateRangeMock).toHaveBeenCalledWith(30)
  })
})
