import {
  convertSeconds,
  encrypt,
  decrypt,
  mutateStringToURL,
  strToCoord,
} from "../src/lib/hooks/utils"
import { searchTiles } from "../src/lib/data/searchMap"
import { tiles } from "./utils/mocks"

describe("formatSeconds", () => {
  it("formats seconds into hours, minutes, and seconds", () => {
    expect(convertSeconds(120)).toBe("2m")
    expect(convertSeconds(3661)).toBe("1h 1m 1s")
  })

  it("omits units that are zero", () => {
    expect(convertSeconds(60)).toBe("1m")
    expect(convertSeconds(3600)).toBe("1h")
    expect(convertSeconds(3660)).toBe("1h 1m")
  })
})

describe("Crypto functions", () => {
  const originalText = "Lorem ipsum dolor sit amet"

  test.skip("encrypt function should return a string", () => {
    const encryptedText = encrypt(originalText)
    expect(typeof encryptedText).toBe("string")
  })

  test.skip("decrypt function should return the original text", () => {
    const encryptedText = encrypt(originalText)
    const decryptedText = decrypt(encryptedText)
    expect(decryptedText).toBe(originalText)
  })
})

describe("mutateStringToURL", () => {
  test("converts string to valid URL", () => {
    const testString = "This Is A Test String - 123!"
    const expectedOutput = "this-is-a-test-string-123"
    expect(mutateStringToURL(testString)).toEqual(expectedOutput)
  })
})

describe("strToCoord", () => {
  test("converts string to coordinates", () => {
    const testString = "12,-34"
    const expectedOutput = { x: 12, y: -34 }
    expect(strToCoord(testString)).toEqual(expectedOutput)
  })

  test("handles invalid input", () => {
    const testString = "abc,def"
    expect(strToCoord(testString)).toEqual({ x: NaN, y: NaN })
  })
})

describe("searchTiles", () => {
  it("returns an empty array when keyword is empty", () => {
    const result = searchTiles(tiles, "")
    expect(result).toEqual([])
  })

  it("returns an empty array when no tiles match the keyword", () => {
    const result = searchTiles(tiles, "game")
    expect(result).toEqual([])
  })

  it("returns an array of matching tiles when some tiles match the keyword", () => {
    const result = searchTiles(tiles, "scene")
    expect(result).toEqual([
      {
        scene: {
          name: "Scene 1",
        },
      },
      {
        scene: {
          name: "Scene 2",
        },
      },
      {
        scene: {
          name: "Scene 3",
        },
      },
    ])
  })

  it("returns an array of unique matching tiles when some tiles have the same scene name", () => {
    const tilesWithDuplicateSceneName = {
      tile1: {
        scene: {
          name: "Scene 1",
        },
      },
      tile2: {
        scene: {
          name: "Scene 2",
        },
      },
      tile3: {
        scene: {
          name: "Scene 1",
        },
      },
    }

    const result = searchTiles(tilesWithDuplicateSceneName, "scene")
    expect(result).toEqual([
      {
        scene: {
          name: "Scene 1",
        },
      },
      {
        scene: {
          name: "Scene 2",
        },
      },
    ])
  })
})
