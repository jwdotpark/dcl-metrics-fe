import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  GridItem,
  List,
  ListItem,
  useColorModeValue,
  useDisclosure,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"

const MobileApiList = (props) => {
  return (
    <GridItem w="100%" colSpan={6}>
      <ApiListDrawer {...props} />
    </GridItem>
  )
}

export default MobileApiList

const ApiListDrawer = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { categories, data, itemIndex, setItemIndex, setSelectedItem } = props

  return (
    <>
      <Button
        w="100%"
        color="#fff"
        bg={useColorModeValue("#6272a4", "#6272a4")}
        borderRadius="xl"
        shadow="md"
        onClick={onOpen}
      >
        API List
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="top">
        <DrawerOverlay />
        <DrawerContent>
          {/*<DrawerHeader borderBottomWidth="1px">API List</DrawerHeader>*/}
          <DrawerBody>
            <Box m="4">
              {categories.map((category) => {
                return (
                  <Box key={category}>
                    <Box>
                      <Text my="4" fontSize="4xl" fontWeight="bold">
                        {category.toUpperCase()}
                      </Text>
                    </Box>
                    <List spacing={4}>
                      {data.map((item, i) => {
                        if (
                          item.data.category === category &&
                          !item.data.subCategory
                        ) {
                          return (
                            <Link
                              href={`/api-docs/${item.data.category}-${item.data.title}`}
                              key={item.data.title}
                              onClick={onClose}
                            >
                              <ListItem
                                key={item.data.title}
                                w="100%"
                                mb="2"
                                px="4"
                                py="2"
                                bg={
                                  itemIndex === i &&
                                  // eslint-disable-next-line react-hooks/rules-of-hooks
                                  useColorModeValue("gray.200", "gray.700")
                                }
                                borderRadius="xl"
                                _hover={{
                                  // eslint-disable-next-line react-hooks/rules-of-hooks
                                  bg: useColorModeValue("gray.200", "gray.600"),
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setSelectedItem(item)
                                  setItemIndex(i)
                                }}
                              >
                                <Text fontSize="lg" fontWeight="semibold">
                                  {item.data.title}
                                </Text>
                                <Text as="kbd">{item.data.description}</Text>
                              </ListItem>
                            </Link>
                          )
                        }
                      })}
                    </List>
                    <Divider my="4" />
                  </Box>
                )
              })}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
