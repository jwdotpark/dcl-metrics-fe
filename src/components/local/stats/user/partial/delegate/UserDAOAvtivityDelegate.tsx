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
  Center,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react"
import Link from "next/link"
import DelegatorsModalBody from "./DelegatorsModalBody"

const UserDAOAvtivityDelegate = ({ name, delegate, delegators }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  if (delegators === undefined || delegators.length === 0) return null

  return (
    <>
      {delegate && (
        <Flex w="100%" h="100%">
          <Box>Delegate</Box>
          <Spacer />
          <Box>
            <Button
              disabled={!delegate}
              onClick={() => handleToast(delegate)}
              variant="link"
            >
              <Link href={`/users/${delegate}`} target="_blank">
                <Button borderRadius="xl" shadow="md" size="xs">
                  <Text
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    color={useColorModeValue("#000", "#fff")}
                    fontWeight="bold"
                  >
                    Delegate
                  </Text>
                </Button>
              </Link>
            </Button>
          </Box>
        </Flex>
      )}
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
            <Text ml="6" color={delegators.length > 0 ? "green" : "gray"}>
              {delegators.length > 0
                ? delegators.length + " delegators"
                : "N/A"}
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
            <ModalHeader>
              <Center h="75px" fontSize="3xl">
                Delegators
              </Center>
            </ModalHeader>
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
