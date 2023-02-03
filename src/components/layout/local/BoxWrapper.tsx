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
    hover: {
      shadow: "lg",
      outline: "2px solid",
      outlineColor: useColorModeValue("gray.300", "gray.800"),
      transition: "outline .5s ease-in-out",
    },
    transition: "box-shadow 0.25s ease-in-out",
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
      _hover={box.hover}
      transition={box.transition}
      colSpan={box.colSpan}
    >
      {children}
    </GridItem>
  )
}

export default BoxWrapper
