import React from "react"
import { render } from "@testing-library/react"
import { ChakraProvider } from "@chakra-ui/react"
import BoxWrapper from "../../src/components/layout/local/BoxWrapper"
import BoxTitle from "../../src/components/layout/local/BoxTitle"

describe("Box Wrapper", () => {
  it("renders children properly", () => {
    const { getByText } = render(
      <ChakraProvider>
        <BoxWrapper colSpan={3}>
          <div>Hello World!</div>
        </BoxWrapper>
      </ChakraProvider>
    )
    expect(getByText("Hello World!")).toBeInTheDocument()
  })
})

describe("BoxTitle component", () => {
  test("renders without crashing", () => {
    const mockProps = {
      name: "Test name",
      description: "Test description",
      date: "",
      avgData: 5,
      slicedData: [1, 2, 3, 4, 5],
      color: "red",
      line: 1,
      setLine: jest.fn(),
    }
    render(<BoxTitle {...mockProps} />)
  })
})
