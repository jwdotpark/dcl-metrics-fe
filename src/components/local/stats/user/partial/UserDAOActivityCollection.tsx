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
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import CollectionModalBody from "../partial/collection/CollectionModalBody"

const UserDAOActivityCollection = ({ name, collections }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  console.log(collections)

  return (
    <Flex w="100%" h="100%">
      <Box>Collections</Box>
      <Spacer />
      <Box>
        <Button borderRadius="xl" onClick={onOpen} variant="link">
          <Text color={collections.length > 0 ? "green" : "red"}>
            {(collections.length > 0 && collections.length + " collections") ||
              "No collections"}
          </Text>
        </Button>
      </Box>
      <Modal
        isCentered
        isOpen={isOpen}
        motionPreset="slideInRight"
        onClose={onClose}
        size={["xl", "sm", "md", "lg", "xl", "xl"]}
      >
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalHeader>{name} Collections</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CollectionModalBody collections={collections} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default UserDAOActivityCollection
