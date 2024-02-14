import {
  Divider,
  Image,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Heading,
  Text,
} from "@chakra-ui/react"
import { FiInfo } from "react-icons/fi"

const EventItemDrawer = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  console.log(data)

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
            <DrawerBody>
              <Box overflow="hidden" mt="2" borderRadius="md">
                <Image alt={data.name} src={data.image} />
              </Box>
              <Box>
                <Heading fontSize="">{data.name}</Heading>
              </Box>
              <Divider />
              <Box mt="4">
                <Text whiteSpace="pre-line">{data.description}</Text>
              </Box>
              <Divider my="4" />
              <Box></Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </Box>
  )
}

export default EventItemDrawer
