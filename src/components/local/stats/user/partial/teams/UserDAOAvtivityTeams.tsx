import {
  Text,
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react"
import TeamModalBody from "./TeamModalBody"

const UserDAOActivityTeam = ({ name, teams }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    teams && (
      <Flex w="100%" h="100%">
        <Box>Teams</Box>
        <Spacer />
        <Box>
          <Button
            borderRadius="xl"
            disabled={teams.length > 0 ? false : true}
            onClick={onOpen}
            variant="link"
          >
            <Text ml="6" color={teams.length > 0 ? "green" : "gray"}>
              {teams.length > 0 ? teams.length : "N/A"}
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
                <Text fontSize="3xl">Teams</Text>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="scroll" maxH="80vh">
              <TeamModalBody teams={teams} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    )
  )
}

export default UserDAOActivityTeam
