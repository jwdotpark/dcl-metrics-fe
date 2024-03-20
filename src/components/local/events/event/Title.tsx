import { Text, Center, Box, Flex, Spacer, Badge } from "@chakra-ui/react"
import { eventStatus } from "../../../../lib/hooks/utils"
import BoxWrapper from "../../../layout/local/BoxWrapper"

export const Title = ({ event }) => {
  const status = eventStatus(event)

  const getColor = (status: string) => {
    switch (status) {
      case "past":
        return "orange"
      case "current":
        return "green"
      case "upcoming":
        return "blue"
    }
  }
  return (
    <BoxWrapper colSpan={[8]}>
      <Flex
        direction={["column", "row"]}
        h={["auto", "100%"]}
        mt={[4, 0]}
        mx="4"
      >
        <Box>
          <Text fontSize={["md", "2xl", "3xl", "4xl"]} fontWeight="black">
            {event.name}
          </Text>
        </Box>
        <Spacer />
        <Center justifyContent={["flex-start", "center"]} pt={[2, 0]}>
          <Badge
            px="2"
            py="1"
            fontSize={["xs", "sm"]}
            border="1px"
            borderRadius="md"
            shadow="md"
            colorScheme={getColor(status)}
            variant="subtle"
          >
            {eventStatus(event).toUpperCase()} EVENT
          </Badge>
        </Center>
      </Flex>
    </BoxWrapper>
  )
}
