import {
  Box,
  Text,
  Flex,
  Spacer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
} from "@chakra-ui/react"
import CollectionModalBody from "../partial/collection/CollectionModalBody"

const UserDAOActivityCollection = ({ name, collections }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex w="100%" h="100%">
      <Box>Collections</Box>
      <Spacer />
      <Box>
        <Button
          borderRadius="xl"
          disabled={collections.length > 0 ? false : true}
          onClick={onOpen}
          variant="link"
        >
          <Text color={collections.length > 0 ? "green" : "gray"}>
            {(collections.length > 0 && collections.length + " collections") ||
              "N/A"}
          </Text>
        </Button>
      </Box>
      <Modal
        isCentered
        isOpen={isOpen}
        motionPreset="slideInRight"
        onClose={onClose}
        size={["full", "sm", "md", "lg", "xl", "xl"]}
      >
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalHeader>
            <Center h="75px" fontSize="3xl">
              {name} Collections
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="scroll" maxH="90vh">
            <CollectionModalBody collections={collections} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default UserDAOActivityCollection
