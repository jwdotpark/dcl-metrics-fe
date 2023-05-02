import {
  formatCount,
  findFalse,
  plotMissingDates,
} from "../../../src/lib/data/chartInfo"
import moment from "moment"

describe("formatCount", () => {
  it('returns "None" when val is 0', () => {
    const result = formatCount(0)
    expect(result).toEqual("None")
  })

  it("returns a formatted time string when val is less than 24 hours", () => {
    const result = formatCount(120)
    expect(result).toEqual("2m")
  })

  it('returns "24h" when val is 24 hours or greater', () => {
    const result = formatCount(60 * 60 * 24)
    expect(result).toEqual("24h")
  })
})
