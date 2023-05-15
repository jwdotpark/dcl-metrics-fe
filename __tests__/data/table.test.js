import { sliceStr, normalizeValue } from "../../src/lib/data/tableInfo"

describe("sliceStr", () => {
  it("should return the original if it is shorter than 30 char", () => {
    const result = sliceStr("Quick brown fox jumps")
    expect(result).toEqual("Quick brown fox jumps")
  })

  it("should return a truncated string with '..' appended if longer than 30 char", () => {
    const result = sliceStr("Quick brown fox jumps over the lazy dog")
    expect(result).toEqual("Quick brown fox jumps over..")
  })

  it("should return an empty string if the input is null or undefined", () => {
    const result1 = sliceStr(null)
    const result2 = sliceStr(undefined)
    expect(result1).toEqual("")
    expect(result2).toEqual("")
  })
})

//describe("normalizeValue ", () => {
//  it("should return an array of normalized values", () => {
//    const data = [
//      { time_spent: 10, parcels_visited: 5 },
//      { time_spent: 20, parcels_visited: 10 },
//      { time_spent: 30, parcels_visited: 15 },
//    ]
//    const expected = [20, 50, 80]
//    const result = normalizeValue(data)
//    expect(result).toEqual(expected)
//  })

//  it("should handle empty data array", () => {
//    const data = []
//    const expected = []
//    const result = normalizeValue(data)
//    expect(result).toEqual(expected)
//  })

//  it("should handle data array with only one element", () => {
//    const data = [{ time_spent: 10, parcels_visited: 5 }]
//    const expected = [20]
//    const result = normalizeValue(data)
//    expect(result).toEqual(expected)
//  })
//})
