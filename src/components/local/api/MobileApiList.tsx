import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  GridItem,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react"
import BoxWrapper from "../../layout/local/BoxWrapper"

const MobileApiList = ({ data }) => {
  return (
    <GridItem w="100%" colSpan={6}>
      <ApiListDrawer />
    </GridItem>
  )
}

export default MobileApiList

const ApiListDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        w="100%"
        borderRadius="xl"
        shadow="md"
        colorScheme="blue"
        onClick={onOpen}
      >
        API List
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="top">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">API List</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
