import {
  Text,
  Box,
  Button,
  Flex,
  Spacer,
  useDisclosure,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import ProposalModalBody from "./ProposalModalBody"

// eslint-disable-next-line no-unused-vars
const UserDAOActivityProposal = ({ name, proposals }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    proposals && (
      <Flex w="100%" h="100%">
        <Box>Proposals</Box>
        <Spacer />
        <Box>
          <Button
            borderRadius="xl"
            disabled={proposals.count > 0 ? false : true}
            onClick={onOpen}
            variant="link"
          >
            <Text ml="8" color={proposals.count > 0 ? "green" : "gray"}>
              {proposals.count > 0 ? proposals.count : "N/A"}
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
              <Center h="75px">
                <Text fontSize="3xl">Proposals</Text>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="scroll" maxH="80vh">
              <ProposalModalBody proposals={proposals} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    )
  )
}

export default UserDAOActivityProposal
