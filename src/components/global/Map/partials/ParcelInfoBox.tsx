import {
  Box,
  ButtonGroup,
  Text,
  Button,
  useColorModeValue,
  Center,
  Flex,
  Spacer,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
} from "@chakra-ui/react"
import { FiChevronsRight } from "react-icons/fi"
import { useEffect, useRef, useState } from "react"
import MapImage from "./MapImage"
import ParcelInfoTable from "./ParcelInfoTable"

const ParcelInfoBox = ({
  isMapExpanded,
  selectedParcel,
  coord,
  isIncluded,
  mapHeight,
  getButtonProps,
}) => {
  const [fetchedInfo, setfetchedInfo] = useState({})
  const [isPicLoading, setIsPicLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const fetchParcel = async () => {
    setIsPicLoading(true)
    const baseUrl = `https://api.decentraland.org/v2/parcels/${coord.x}/${coord.y}`
    try {
      const res = await fetch(baseUrl, {
        cache: "force-cache",
      })
      const json = await res.json()
      setfetchedInfo(json)
    } catch (error) {
      console.log(error)
    } finally {
      setIsPicLoading(false)
    }
  }

  // @ts-ignore
  const { description, external_url, image } = fetchedInfo
  const { name, estateId } = selectedParcel
  const baseUrl = `https://api.decentraland.org/v1/estates/${estateId}/map.png`
  const jumpInUrl = `https://play.decentraland.org/?position=${coord.x}%2C${coord.y}`

  const trimName = (name) => {
    if (!isMapExpanded && name.length > 12) {
      return name.slice(0, 12) + ".."
    } else {
      return name
    }
  }

  useEffect(() => {
    fetchParcel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coord])

  const AlertJumpIn = () => {
    return (
      <>
        <AlertDialog
          isCentered
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          motionPreset="slideInBottom"
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogBody mt="4">
                Do you want to visit{" "}
                {selectedParcel.scene && selectedParcel.scene.name + " on "} [
                {selectedParcel.id}]?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  ml={3}
                  colorScheme="purple"
                  // on click open new tab external_url
                  onClick={() => {
                    window.open(jumpInUrl, "_blank")
                    onClose()
                  }}
                >
                  Jump In
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  return (
    <Box h="100%" p="4" borderRadius="xl">
      <AlertJumpIn />
      <Center>
        <ButtonGroup w="100%">
          <Button
            w="100%"
            mb="4"
            color="gray.50"
            bg="#6272a4"
            borderRadius="xl"
            shadow="md"
            onClick={() => onOpen()}
          >
            <Text fontSize="xl" fontWeight="bold">
              {selectedParcel.scene &&
                trimName(selectedParcel.scene.name) + " - "}
              {"[" + selectedParcel.id + "]"}
            </Text>
          </Button>
          <Button
            w="15"
            mb="4"
            color="gray.50"
            bg="#282a36"
            borderRadius="xl"
            shadow="md"
            {...getButtonProps()}
          >
            <FiChevronsRight />
          </Button>
        </ButtonGroup>
      </Center>

      <Flex
        direction="column"
        p="2"
        bg={useColorModeValue("gray.300", "gray.800")}
        borderRadius="xl"
        shadow="md"
      >
        <Box w="100%">
          <Flex h="100%" dir="row">
            <Box w="100%">
              <MapImage
                isMapExpanded={isMapExpanded}
                isPicLoading={isPicLoading}
                name={name}
                image={image}
                isIncluded={isIncluded}
              />
            </Box>
            <Spacer />
            {isIncluded && (
              <Box w="100%">
                <MapImage
                  isMapExpanded={isMapExpanded}
                  isPicLoading={isPicLoading}
                  name={name}
                  image={baseUrl}
                  isIncluded={isIncluded}
                />
              </Box>
            )}
          </Flex>
        </Box>
        <Box w="100%" mt="4">
          <ParcelInfoTable
            external_url={external_url}
            selectedParcel={selectedParcel}
            description={description}
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default ParcelInfoBox
