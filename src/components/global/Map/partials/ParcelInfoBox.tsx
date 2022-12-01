import {
  Box,
  Text,
  Button,
  useColorModeValue,
  Center,
  Flex,
  Spacer,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { isMap } from "util/types"
import MapImage from "./MapImage"
import ParcelInfoTable from "./ParcelInfoTable"

const ParcelInfoBox = ({
  isMapExpanded,
  selectedParcel,
  coord,
  isIncluded,
  mapHeight,
}) => {
  const [fetchedInfo, setfetchedInfo] = useState({})
  const [isPicLoading, setIsPicLoading] = useState(false)

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
  const { name, id, updatedAt, owner, tokenId, estateId } = selectedParcel
  const baseUrl = `https://api.decentraland.org/v1/estates/${estateId}/map.png`

  const trimName = (name) => {
    if (!isMapExpanded && name.length > 15) {
      return name.slice(0, 16) + ".."
    } else {
      return name
    }
  }

  useEffect(() => {
    fetchParcel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coord])

  return (
    <Box
      overflowY={isMapExpanded ? "hidden" : "scroll"}
      h={!isMapExpanded ? mapHeight.collapsed : "auto"}
      m="4"
      p="4"
      bg={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
      shadow="md"
    >
      <Center>
        <Button
          w="100%"
          mb="4"
          color="gray.50"
          bg="#6272a4"
          // colorScheme="teal"
          borderRadius="xl"
          shadow="md"
        >
          <Text fontSize="xl" fontWeight="bold">
            {selectedParcel.scene &&
              trimName(selectedParcel.scene.name) + " - "}
            {"[" + selectedParcel.id + "]"}
          </Text>
        </Button>
      </Center>
      <Flex
        direction={isMapExpanded ? "row" : "column"}
        p="2"
        bg={useColorModeValue("gray.300", "gray.800")}
        borderRadius="xl"
        shadow="md"
      >
        <Box w={isMapExpanded ? "50%" : "100%"}>
          <Flex direction={isMapExpanded ? "column" : "row"}>
            <Box w="100%">
              <MapImage
                isMapExpanded={isMapExpanded}
                isPicLoading={isPicLoading}
                name={name}
                image={image}
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
                />
              </Box>
            )}
          </Flex>
        </Box>
        <Box w={isMapExpanded ? "50%" : "100%"}>
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
