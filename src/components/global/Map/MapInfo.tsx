import { Button, Box, GridItem, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import MapInfoTable from "./partials/MapInfoTable"
import MapImage from "./partials/MapImage"

const MapInfo = ({
  h,
  coord,
  setCoord,
  selectedParcel,
  setSelectedParcel,
  isMapExpanded,
  setIsMapExpanded,
}) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("gray.100", "gray.700"),
  }
  const [fetchedInfo, setfetchedInfo] = useState({})
  const [isPicLoading, setIsPicLoading] = useState(false)

  const fetchParcelInfo = async () => {
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
    fetchParcelInfo()
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
      w={["100%", "100%", "100%", "30%"]}
      bg={box.bg}
      border="solid 1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
      shadow="md"
    >
      <GridItem w={box.w} h="100%" mb="4" borderRadius="xl">
        <Box p="2">
          <MapInfoNameBox />
          {isMapExpanded && (
            <MapImage isPicLoading={isPicLoading} name={name} image={image} />
          )}
          <MapInfoTable
            selectedParcel={selectedParcel}
            description={description}
          />
        </Box>
      </GridItem>
    </Box>
  )
}

export default MapInfo
