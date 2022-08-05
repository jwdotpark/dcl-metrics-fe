import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Center,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  VStack,
} from "@chakra-ui/react"
import { convertSeconds } from "../../lib/hooks/utils"
import ProfilePicture from "./ProfilePicture"

const PopupModal = ({ isOpen, value, onClose }) => {
  return (
    <Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnEsc
        motionPreset="slideInBottom"
        variant={useColorModeValue("solid", "outline")}
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("gray.200", "gray.800")}>
          <ModalCloseButton />
          <Center m="4">
            <VStack padding={2}>
              <Flex w="100%" borderRadius="full">
                <Center w="100%">
                  <ProfilePicture address={value.indexValue} modal={true} />
                </Center>
              </Flex>
              <Stack
                flex={1}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                p={1}
                pt={2}
              >
                <Heading fontSize={"2xl"} fontFamily={"body"}></Heading>
                <a
                  target="_blank"
                  href={"https://etherscan.io/address/" + `${value.indexValue}`}
                  rel="noreferrer"
                >
                  <Text
                    _hover={{ cursor: "pointer", color: "gray.800" }}
                    fontWeight={600}
                    // color={"gray.500"}
                    size="lg"
                    mb={4}
                    as="kbd"
                    wordBreak="break-word"
                  >
                    {value.indexValue}
                  </Text>
                </a>
                <Text>
                  User spent <b>{convertSeconds(value.value)}</b> yesterday.
                </Text>
              </Stack>
            </VStack>
          </Center>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default PopupModal
