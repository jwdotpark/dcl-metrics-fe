import { GridItem, useColorModeValue } from "@chakra-ui/react"

const BoxWrapper = ({ children, colSpan }) => {
  const box = {
    h: "auto",
    w: "100%",
    p: [0, 1, 1, 2, 2],
    bg: useColorModeValue("white", "gray.800"),
    border: "1px solid",
    borderColor: useColorModeValue("gray.300", "gray.700"),
    borderRadius: "xl",
    shadow: "md",
    pb: 4,
    colSpan: colSpan,
  }

  return (
    <GridItem
      overflowX="hidden"
      w={box.w}
      h={box.h}
      p={box.p}
      pb={box.pb}
      bg={box.bg}
      border={box.border}
      borderColor={box.borderColor}
      borderRadius={box.borderRadius}
      shadow={box.shadow}
      colSpan={box.colSpan}
    >
      {children}
    </GridItem>
  )
}

export default BoxWrapper
