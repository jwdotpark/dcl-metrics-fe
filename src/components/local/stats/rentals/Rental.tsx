import { Box, Flex } from "@chakra-ui/react"
import RentalDay from "./RentalDay"
import RentTotal from "./RentalTotal"
import moment from "moment"

const Rental = ({ data }) => {
  const color = ["#48BB78", "#4299E1", "#9F7AEA", "#F56565"]
  const firstDate = moment
    .unix(data.analyticsDayDatas[0].date)
    .format("YYYY MMM. D")

  return (
    <Flex
      direction={["column", "column", "column", "column", "row"]}
      w="100%"
      h="auto"
    >
      <RentalDay data={data.analyticsDayDatas} />
      <RentTotal data={data.analyticsTotalDatas} />
    </Flex>
  )
}

export default Rental
