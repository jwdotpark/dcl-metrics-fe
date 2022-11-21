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
      // h={["35vh", "35vh"]}
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
          <Box w="100%" h={[125, 150, 175]} p="2">
            <Center h="100%">
              {isPicLoading ? (
                <Spinner />
              ) : (
                <Box overflow="hidden" w="100%" borderRadius="xl" shadow="md">
                  <Image
                    minW="100%"
                    h={[150, 175, 200]}
                    objectFit="cover"
                    alt={name}
                    src={image}
                  />
                </Box>
              )}
            </Center>
          </Box>
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
