import {
  convertSeconds,
  encrypt,
  decrypt,
  mutateStringToURL,
  strToCoord,
} from "../src/lib/hooks/utils"

describe("convertSeconds", () => {
  test("should convert seconds to hours, minutes, and seconds", () => {
    expect(convertSeconds(3661)).toBe("1h 01m 01s")
    expect(convertSeconds(7200)).toBe("2h 00m 00s")
    expect(convertSeconds(70)).toBe("0h 01m 10s")
  })
})

describe("Crypto functions", () => {
  const originalText = "Lorem ipsum dolor sit amet"

  test("encrypt function should return a string", () => {
    const encryptedText = encrypt(originalText)
    expect(typeof encryptedText).toBe("string")
  })

  test("decrypt function should return the original text", () => {
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
