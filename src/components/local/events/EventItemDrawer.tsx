import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import { FiInfo } from "react-icons/fi"

const EventItemDrawer = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box>
      <>
        <Button onClick={onOpen} size="sm" variant="ghost">
          <FiInfo />
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="xl">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">{data.name}</DrawerHeader>
            <DrawerBody>{JSON.stringify(data, null, 2)}</DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </Box>
  )
}

export default EventItemDrawer
