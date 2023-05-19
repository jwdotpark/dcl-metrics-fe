import React from "react"
import { render } from "@testing-library/react"
import PieChart from "../../../src/lib/PieChart"

window.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

describe("PieChart", () => {
  const data = [
    { id: "A", value: 10 },
    { id: "B", value: 20 },
    { id: "C", value: 30 },
  ]

  it("renders without crashing", () => {
    const { getByTestId } = render(<PieChart data={data} />)
    expect(getByTestId("pie-chart")).toBeInTheDocument()
  })
})
