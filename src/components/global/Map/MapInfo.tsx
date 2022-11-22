import {
  Text,
  Image,
  Box,
  GridItem,
  useColorModeValue,
  Center,
  Spinner,
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import moment from "moment"
import MapInfoTable from "./partials/MapInfoTable"
import MapImage from "./partials/MapImage"

const MapInfo = ({ h, coord, setCoord, selectedParcel, setSelectedParcel }) => {
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
    const res = await fetch(baseUrl)
    const json = await res.json()
    setfetchedInfo(json)
    setIsPicLoading(false)
  }

  // @ts-ignore
  const { description, external_url, image } = fetchedInfo
  const { name, id, updatedAt, owner, tokenId } = selectedParcel
  useEffect(() => {
    fetchParcelInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coord])

  const temp = "long name that is longer than 10 character"

  return (
    <Box
      w={["100%", "100%", "100%", "30%"]}
      border="solid 1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
      shadow="md"
    >
      <GridItem w={box.w} h="100%" mb="4" bg={box.bg} borderRadius="xl">
        <Box p="2">
          <Box p="2">
            <Text mb="2" fontSize="xl">
              <a target="_blank" rel="noopener noreferrer" href={external_url}>
                {name ? name : "N/A"}
              </a>
            </Text>
          </Box>
          <MapImage isPicLoading={isPicLoading} name={name} image={image} />
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
