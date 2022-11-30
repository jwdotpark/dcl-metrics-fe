import { Box, Text, Button, useColorModeValue, Center } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import MapImage from "./MapImage"
import MapInfoTable from "./ParcelInfoTable"

const SceneInfoBox = ({ isMapExpanded, selectedParcel, coord, isIncluded }) => {
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
  const { name, id, updatedAt, owner, tokenId } = selectedParcel

  useEffect(() => {
    fetchParcel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coord])

  const MapInfoNameBox = () => {
    return (
      <Box p="2">
        <Button
          w="100%"
          color="gray.100"
          fontSize="xl"
          bg="#6272A4"
          borderRadius="xl"
          shadow="md"
          _hover={{
            bg: "#4A5568",
          }}
          wordBreak="break-all"
          noOfLines={1}
          variant="solid"
        >
          <a target="_blank" rel="noopener noreferrer" href={external_url}>
            {name ? name : "N/A"}
          </a>
        </Button>
      </Box>
    )
  }

  return (
    <Box
      w="100%"
      mr="4"
      ml="2"
      my="4"
      p="2"
      bg={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
    >
      <Center>
        <Text fontSize="xl" fontWeight="bold">
          Scene
        </Text>
      </Center>
      {/* <MapInfoNameBox /> */}
      {isMapExpanded && (
        <MapImage isPicLoading={isPicLoading} name={name} image={image} />
      )}
      
      {/* <MapInfoTable selectedParcel={selectedParcel} description={description} /> */}
    </Box>
  )
}

export default SceneInfoBox
