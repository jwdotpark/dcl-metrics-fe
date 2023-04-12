import {
  useToast,
  Box,
  Text,
  Flex,
  Spacer,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Center,
} from "@chakra-ui/react"
import CollectionPopOverBody from "./CollectionPopOverBody"

const UserDAOActivityCollection = ({ collections, delegators }) => {
  return (
    <Flex w="100%" h="100%">
      <Box>Collection</Box>
      <Spacer />
      <Box>
        <Text>
          <b>
            {collections && (
              <Popover placement="left">
                <PopoverTrigger>
                  <Button
                    borderRadius="xl"
                    disabled={delegators.length > 0 ? false : true}
                    size="sm"
                    variant="solid"
                  >
                    {collections.length > 0 ? collections.length : "N/A"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent w="100%" borderRadius="xl">
                  <PopoverArrow />
                  <PopoverBody>
                    {collections.length > 0 &&
                      collections.map((item) => {
                        return (
                          <Flex key={item.name} w="100%" mb="2">
                            <Box w="100%">
                              <Popover placement="left">
                                <PopoverTrigger>
                                  <Box w="100%">
                                    <Button
                                      w="100%"
                                      shadow="md"
                                      size="sm"
                                      variant="solid"
                                    >
                                      <Center>
                                        <Text>{item.name}</Text>
                                      </Center>
                                    </Button>
                                  </Box>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <PopoverArrow />
                                  <CollectionPopOverBody item={item} />
                                </PopoverContent>
                              </Popover>
                            </Box>
                          </Flex>
                        )
                      })}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            )}
          </b>
        </Text>
      </Box>
    </Flex>
  )
}

export default UserDAOActivityCollection
