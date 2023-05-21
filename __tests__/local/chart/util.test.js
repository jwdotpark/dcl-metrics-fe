import {
  formatCount,
  findFalse,
  sliceData,
} from "../../../src/lib/data/chart/chartInfo"

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

describe("findFalse", () => {
  test("returns an empty array when passed an empty object", () => {
    expect(findFalse({})).toEqual([])
  })

  test("returns an empty array when passed an object with no false values", () => {
    expect(findFalse({ a: true, b: 1, c: "foo" })).toEqual([])
  })

  test("returns an array of keys with false values", () => {
    const expected = { a: false, b: 0, c: "", d: null, e: undefined }
    const result = ["a", "b", "c", "d", "e"]
    expect(findFalse(expected)).toEqual(result)
  })

  test("works with non-boolean false values", () => {
    expect(findFalse({ a: false, b: "", c: 0 })).toEqual(["a", "b", "c"])
  })

  // FIXME type checking
  test("throws a TypeError when passed a non-object argument", () => {
    expect(() => findFalse("not an object")).toThrow(TypeError)
    expect(() => findFalse(null)).toThrow(TypeError)
    expect(() => findFalse(undefined)).toThrow(TypeError)
    expect(() => findFalse(42)).toThrow(TypeError)
    expect(() => findFalse(true)).toThrow(TypeError)
  })
})

describe("sliceData", () => {
  it("should return the last n items of the input array if the array is longer than n", () => {
    const chartData = [1, 2, 3, 4, 5, 6, 7]
    const dateRange = 3
    const expected = [5, 6, 7]
    const result = sliceData(chartData, dateRange)
    expect(result).toEqual(expected)
  })

  it("should return the entire input array if the array is shorter than n", () => {
    const chartData = [1, 2, 3, 4, 5]
    const dateRange = 10
    const expected = [1, 2, 3, 4, 5]
    const result = sliceData(chartData, dateRange)
    expect(result).toEqual(expected)
  })

  it("should return an empty array if the input array is empty", () => {
    const chartData = []
    const dateRange = 5
    const expected = []
    const result = sliceData(chartData, dateRange)
    expect(result).toEqual(expected)
  })
})
