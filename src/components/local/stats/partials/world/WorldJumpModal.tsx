import {
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Center,
} from "@chakra-ui/react"
import { useRouter } from "next/router"

const WodldJumpModal = ({ isOpen, onClose, selectedRow }) => {
  const router = useRouter()
  console.log(selectedRow.original)
  const { original } = selectedRow

  const handleJumpClick = () => {
    router.push(original.url)
  }

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalBody>
            <Center mt="2">
              <Image
                overflow="hidden"
                maxW="350px"
                borderRadius="xl"
                objectFit="fill"
                alt={original && original.ens_token}
                src={original && original.scenes[0].thumbnail}
              />
            </Center>
            <Center mt="4" mx="2">
              <Text>
                Would you like to jump into the world{" "}
                <b>
                  {original && original.ens_token} -{" "}
                  {original && original.scenes[0].title}
                </b>
                ?{" "}
              </Text>
            </Center>
          </ModalBody>

          <ModalFooter mt="-4">
            <Button mr={4} onClick={onClose} variant="link">
              Cancel
            </Button>
            <Button
              borderRadius="xl"
              shadow="md"
              colorScheme="purple"
              onClick={handleJumpClick}
              variant="solid"
            >
              Jump In!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WodldJumpModal
