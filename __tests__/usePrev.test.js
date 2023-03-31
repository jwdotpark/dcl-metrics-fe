import { renderHook } from "@testing-library/react-hooks"
import { usePrev } from "../src/lib/hooks/usePrev"

describe("usePrev", () => {
  test("should return previous value of the input", () => {
    const { result, rerender } = renderHook(({ value }) => usePrev(value), {
      initialProps: { value: "initial" },
    })

    expect(result.current).toBe(undefined)
    rerender({ value: "updated" })
    expect(result.current).toBe("initial")
    rerender({ value: 123 })
    expect(result.current).toBe("updated")
  })
})
