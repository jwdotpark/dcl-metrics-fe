import {
  Box,
  Text,
  Flex,
  Spacer,
  IconButton,
  Tooltip,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ButtonGroup,
} from "@chakra-ui/react"
import DatePicker from "../../local/stats/scenes/DatePicker"
import { FiDownload } from "react-icons/fi"

const SceneTitle = ({
  name,
  date,
  dateForPicker,
  setDate,
  availableDate,
  hasMultipleScenes,
  description,
  uuid,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCSVClick = () => {
    onOpen()
  }

  const handleSaveClick = async () => {
    const response = await fetch("/api/csv?uuid=" + uuid)
    const data = await response.text()
    const blob = new Blob([data], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = `${name}.csv`
    link.href = url
    link.click()
    onClose()
  }

  const handleCloseClick = () => {
    onClose()
  }

  return (
    <Flex direction={["column", "column", "row", "row"]}>
      <Box>
        <Flex direction="column" mt="4" mx="5">
          <Box>
            <Text fontSize="2xl">
              <b>{name}</b>
            </Text>
          </Box>
          <Box>
            <Text color="gray.500" fontSize="sm">
              {description}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Spacer />
      {uuid && (
        <Flex m="4">
          <Box mr="2">
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent borderRadius="xl">
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box w="100%">
                    <Text fontSize="lg" wordBreak="break-word">
                      Would you like to download the CSV data of
                      <br />
                      <kbd>{name}</kbd>?
                    </Text>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <ButtonGroup>
                    <Button
                      borderRadius="xl"
                      colorScheme="green"
                      onClick={handleSaveClick}
                    >
                      {/*<a
                        href={`${getEndpoint(`reports/${uuid}`)}`}
                        download={`${name}.csv`}
                      >*/}
                      Download
                      {/*</a>*/}
                    </Button>
                    <Button borderRadius="xl" onClick={handleCloseClick}>
                      Cancel
                    </Button>
                  </ButtonGroup>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Tooltip
              p="2"
              fontSize="sm"
              borderRadius="md"
              label="Download CSV"
              placement="top"
            >
              <IconButton
                sx={{ transform: "translateY(1px)" }}
                border="2px solid"
                borderRadius="lg"
                shadow="md"
                aria-label="Download"
                icon={<FiDownload />}
                onClick={handleCSVClick}
                variant="outline"
              />
            </Tooltip>
          </Box>
          <Box w="100%">
            <DatePicker
              date={dateForPicker}
              setDate={setDate}
              availableDate={availableDate}
            />
          </Box>
        </Flex>
      )}
    </Flex>
  )
}

export default SceneTitle
