import { Box, Flex } from "@chakra-ui/react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import RentalDay from "./RentalDay"
import RentTotal from "./RentalTotal"

const Rental = ({ data }) => {
  const color = ["#48BB78", "#4299E1", "#9F7AEA", "#F56565"]
  return (
    <Flex
      direction={["column", "column", "column", "column", "row"]}
      w="100%"
      h="auto"
    >
      <RentalDay data={data.analyticsDayDatas} color={color} />
      <RentTotal data={data.analyticsTotalDatas} color={color} />
    </Flex>
  )
}

export default Rental
