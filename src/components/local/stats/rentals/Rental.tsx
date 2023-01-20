import { Box, Flex } from "@chakra-ui/react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import RentalDay from "./RentalDay"
import RentTotal from "./RentalTotal"

const Rental = ({ data }) => {
  return (
    <Flex direction={["column", "row"]} w="100%" h="auto">
      <RentalDay data={data.analyticsDayDatas} />
      <RentTotal data={data.analyticsTotalDatas} />
    </Flex>
  )
}

export default Rental
