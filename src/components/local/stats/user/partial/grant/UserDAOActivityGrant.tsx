import {
  Button,
  Text,
  Box,
  Flex,
  Spacer,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import GrandModalBody from "../grant/GrantModalBody"

const UserDAOActivityGrant = ({ name, grants }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const isGrantValid =
    grants.authored.count === 0 && grants.beneficiary.count === 0 ? true : false

  return (
    <Flex w="100%" h="100%">
      <Box>Grant</Box>
      <Spacer />
      <Box>
        <Button
          borderRadius="xl"
          disabled={isGrantValid}
          onClick={onOpen}
          variant="link"
        >
          <Text color={!isGrantValid ? "green" : "red"}>
            {isGrantValid
              ? "N/A"
              : `${grants.authored.count} authored, ${grants.beneficiary.count} beneficiary`}
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
          <ModalHeader> {name} Grants</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GrandModalBody grants={grants} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default UserDAOActivityGrant
