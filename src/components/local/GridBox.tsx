import { GridItem, useColorModeValue } from "@chakra-ui/react"

const GridBox = ({ box, children }: any) => {
  return (
    <>
      <GridItem
        minW={box.w}
        maxW={box.w}
        h={box.h}
        bg={box.bg}
        border="1px solid"
        borderColor={useColorModeValue("gray.300", "gray.700")}
        borderRadius="xl"
        shadow="md"
      >
        {children}
      </GridItem>
    </>
  )
}

export default GridBox
