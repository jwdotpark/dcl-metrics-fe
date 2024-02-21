import { Text, Center } from "@chakra-ui/react"
import BoxWrapper from "../../../layout/local/BoxWrapper"

export const Title = ({ event }) => {
  return (
    <BoxWrapper colSpan={[6, 8]}>
      <Center h={["auto", "100%"]} mt={[4, 0]} mx="4">
        <Text fontSize={["md", "2xl", "3xl", "4xl"]} fontWeight="black">
          {event.name}
        </Text>
      </Center>
    </BoxWrapper>
  )
}
