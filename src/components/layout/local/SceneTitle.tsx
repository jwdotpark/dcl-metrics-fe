/* eslint-disable no-unused-vars */
import {
  Box,
  Text,
  Flex,
  Spacer,
  IconButton,
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
  useColorModeValue,
} from "@chakra-ui/react"
import DatePicker from "../../local/stats/scenes/DatePicker"
import { FiDownload } from "react-icons/fi"
import ToolTip from "./ToolTip"
import moment from "moment"

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
      <Flex
        direction={["column", "column", "column", "column", "row"]}
        w="calc(100%)"
        m="0"
        mb="0"
        p="4"
        bg={useColorModeValue("white", "gray.800")}
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        borderRadius="xl"
        shadow="md"
      >
        <Box h="100%" fontSize={["xl", "2xl", "3xl"]} fontWeight="semibold">
          <Text noOfLines={1}>{name}</Text>
        </Box>
        <Spacer />
        <Flex align="center" h="100%">
          <ToolTip
            label={`Updated on ${moment(date).format("YYYY/MM/DD hh:mm")}`}
          >
            <Text mr="2">Last Update {moment(date).fromNow()}</Text>
          </ToolTip>
        </Flex>
      </Flex>
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
                      Download
                    </Button>
                    <Button borderRadius="xl" onClick={handleCloseClick}>
                      Cancel
                    </Button>
                  </ButtonGroup>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <ToolTip label="Download CSV">
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
            </ToolTip>
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
