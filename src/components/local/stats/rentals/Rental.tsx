import { Box, Flex } from "@chakra-ui/react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import RentalDay from "./RentalDay"
import RentTotal from "./RentalTotal"

const Rental = ({ data }) => {
  console.log(data)
  return (
    <BoxWrapper>
      <Flex direction={["column", "row"]} w="100%" h="auto" m="2">
        <RentalDay data={data} />
        <RentTotal data={data} />
      </Flex>
    </BoxWrapper>
  )
}

export default Rental
