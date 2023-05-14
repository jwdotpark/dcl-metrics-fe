import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  GridItem,
  List,
  useColorModeValue,
  useDisclosure,
  Text,
} from "@chakra-ui/react"
import SingleListItem from "./SingleListItem"

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
                      {data.map((item) => {
                        if (item.data.category === category) {
                          return (
                            <Box key={item.data.title} onClick={onClose}>
                              <SingleListItem
                                item={item}
                                itemIndex={itemIndex}
                                setItemIndex={setItemIndex}
                                setSelectedItem={setSelectedItem}
                                i={item.data.issue}
                              />
                            </Box>
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
