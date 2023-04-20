import {
  useColorModeValue,
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
  Center,
} from "@chakra-ui/react"
import GrandModalBody from "../grant/GrantModalBody"

const UserDAOActivityGrant = ({ name, grants }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (grants === undefined) return null

  const isGrantValid =
    grants.authored.count === 0 && grants.beneficiary.count === 0 ? true : false

  return (
    !isGrantValid && (
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
            <Text ml="4" color={!isGrantValid ? "green" : "gray"}>
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
          size={["full", "sm", "md", "lg", "xl", "xl"]}
        >
          <ModalOverlay />
          <ModalContent borderRadius="xl">
            <ModalHeader>
              <Center h="75px" mb="-4">
                <Text fontSize="3xl">Grants</Text>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="scroll" maxH="80vh">
              <GrandModalBody grants={grants} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    )
  )
}

export default UserDAOActivityGrant
