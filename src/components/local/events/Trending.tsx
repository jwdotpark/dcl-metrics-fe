/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Text,
  Image,
  useColorModeValue,
  Divider,
  Flex,
  Spacer,
  Button,
  Link,
} from "@chakra-ui/react"
import { format } from "date-fns"
import BoxTitle from "../../layout/local/BoxTitle"
import BoxWrapper from "../../layout/local/BoxWrapper"
import ToolTip from "../../layout/local/ToolTip"

export const TrendingEvents = ({ trending }) => {
  console.log(trending)
  return (
    <BoxWrapper colSpan="8">
      <BoxTitle
        name="Currently Trending Event"
        description=""
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <Box>
        <Flex direction={["column", "row"]} gap="4" mb="4" mx="4">
          {trending.map((event) => {
            return (
              <Box
                key={event.id}
                w="100%"
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.600")}
                borderRadius="xl"
                _hover={{
                  shadow: "lg",
                  borderColor: useColorModeValue("gray.300", "gray.600"),
                  transform: "scale(1.02)",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Link href={`/events/${event.id}`} target="_blank">
                  <Box overflow="hidden" borderTopRadius="xl">
                    <Image
                      w="100%"
                      h="200px"
                      objectFit="cover"
                      alt={event.name}
                      src={event.image}
                    />
                  </Box>
                  <Box m="4">
                    <ToolTip label={event.name}>
                      <Box _hover={{ cursor: "pointer" }}>
                        <Text fontWeight="bold" noOfLines={2}>
                          {event.name}
                        </Text>
                      </Box>
                    </ToolTip>
                    <Divider my="2" />
                    <Flex>
                      <Box>
                        <Text
                          color={useColorModeValue("gray.500", "gray.300")}
                          fontWeight="medium"
                        >
                          {format(new Date(event.next_start_at), "MMMM d")}
                        </Text>
                      </Box>
                      <Spacer />
                      <Box>
                        <Link href={event.url} target="_blank">
                          <Button colorScheme="purple" size="xs">
                            {event.coordinates[0]}, {event.coordinates[1]}
                          </Button>
                        </Link>
                      </Box>
                    </Flex>
                  </Box>
                </Link>
              </Box>
            )
          })}
        </Flex>
      </Box>
    </BoxWrapper>
  )
}
