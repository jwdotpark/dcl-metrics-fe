import { GridItem, useColorModeValue } from "@chakra-ui/react"

const BoxWrapper = ({ children, colSpan }) => {
  const box = {
    h: "auto",
    w: "100%",
    p: [0, 1, 1, 2, 2],
    bg: useColorModeValue("#fff", "gray.800"),
    border: "1px solid",
    borderColor: useColorModeValue("gray.300", "gray.600"),
    borderRadius: "xl",

    shadow: "md",
    pb: 4,
    colSpan: colSpan,
    initial: { outlineColor: useColorModeValue("gray.300", "gray.700") },
    hover: {
      shadow: useColorModeValue(
        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
      ),
      transition: "outline 0.1s ease-in-out",
    },
    transition: "box-shadow 0.5s ease-in-out",
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
      outlineColor={box.initial.outlineColor}
    >
      {children}
    </GridItem>
  )
}

export default BoxWrapper
