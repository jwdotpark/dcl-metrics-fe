import { GridItem } from "@chakra-ui/react"

const GridBox = ({ box, children }: any) => {
  return (
    <>
      <GridItem
        minW={box.w}
        maxW={box.w}
        h={box.h}
        bg={box.bg}
        borderRadius="md"
        boxShadow="md"
      >
        {children}
      </GridItem>
    </>
  )
}

export default GridBox
