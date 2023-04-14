import {
  useToast,
  Box,
  Button,
  Flex,
  Text,
  Spacer,
  useBreakpointValue,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import DelegatorsModalBody from "./DelegatorsModalBody"

const UserDAOAvtivityDelegate = ({ name, delegate, delegators }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const responsiveStr = useBreakpointValue({
    xs: 5,
    sm: 20,
    md: 50,
    lg: 20,
    xl: 30,
    base: 20,
  })

  const truncateName = (name: string) => {
    const nameLength = responsiveStr
    if (name && name.length > nameLength) {
      return name.slice(0, nameLength) + ".."
    }
    return name
  }

  const toast = useToast()

  const handleToast = (value) => {
    navigator.clipboard.writeText(value)
    toast({
      description: "Value " + value + " has been copied to the clipboard.",
      duration: 1000,
      isClosable: true,
      position: "bottom-right",
      status: "success",
    })
  }

  return (
    <>
      <Flex w="100%" h="100%">
        <Box>Delegate</Box>
        <Spacer />
        <Box>
          <Button
            disabled={!delegate}
            onClick={() => handleToast(delegate)}
            variant="link"
          >
            <Text>{delegate ? truncateName(delegate) : "N/A"}</Text>
          </Button>
        </Box>
      </Flex>
      <Flex w="100%" h="100%">
        <Box>Delegators</Box>
        <Spacer />
        <Box>
          <Button
            borderRadius="xl"
            disabled={delegators.length > 0 ? false : true}
            onClick={onOpen}
            variant="link"
          >
            <Text color={delegators.length > 0 ? "green" : "gray"}>
              {delegators.length > 0
                ? delegators.length + " delegators"
                : "No delegators"}
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
            <ModalHeader>Delegators</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <DelegatorsModalBody delegators={delegators} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  )
}
export default UserDAOAvtivityDelegate
