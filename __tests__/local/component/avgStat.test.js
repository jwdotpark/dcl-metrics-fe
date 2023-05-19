import { render, screen, waitFor } from "@testing-library/react"
import AvgStat from "../../../src/components/local/stats/partials/AvgStat"

describe("AvgStat", () => {
  const avgData = [
    {
      id: "Average",
      value: 10,
    },
    {
      id: "Total Mana",
      value: 100,
    },
  ]
  const data = 7
  const color = ["#fff", "#000"]
  const line = {}
  const setLine = jest.fn()

  it("renders the component with the correct data", async () => {
    render(
      <AvgStat
        avgData={avgData}
        data={data}
        color={color}
        line={line}
        setLine={setLine}
      />
    )
    expect(screen.getByText("Average")).toBeVisible()
    expect(screen.getByText("Total Mana")).toBeInTheDocument()
    // CountUp doesn't act immediately
    await waitFor(() => expect(screen.getByText("10")).toBeInTheDocument())
  })
})
