import { Flex, Text, Center, Divider } from "@chakra-ui/react"
import { format } from "date-fns"
import { FiCalendar, FiAtSign } from "react-icons/fi"
import BoxWrapper from "../../../layout/local/BoxWrapper"

export const Title = ({ event }) => {
  return (
    <BoxWrapper colSpan="6">
      <Flex>
        <Center mx="2">
          <Text fontSize={["xl", "2xl", "3xl", "4xl"]} fontWeight="black">
            {event.name}
          </Text>
        </Center>
      </Flex>
      <Divider my="2" />
      <Flex align="center" direction="row" mb="2" mx="2">
        <FiCalendar />
        <Text ml="2" fontWeight="medium">
          {format(new Date(event.start_at), "yyyy MMMM d")}
        </Text>
      </Flex>
      <Flex align="center" direction="row" mb="2" mx="2">
        <FiAtSign />
        <Text ml="2" fontWeight="medium">
          {event.scene_name ? event.scene_name : "N/A"}
        </Text>
      </Flex>
    </BoxWrapper>
  )
}
