import { GridItem } from "@chakra-ui/react"

const DashboardBox = ({ height, children }: any) => {
  return (
    <>
      <GridItem w="100%" h={height} bg="blue.100">
        {children}
      </GridItem>
    </>
  )
}

export default DashboardBox
