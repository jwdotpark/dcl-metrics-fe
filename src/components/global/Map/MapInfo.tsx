import { Text, Image, Box, GridItem, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

const MapInfo = ({ h, coord, setCoord }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("gray.200", "gray.700"),
  }
  const [land, setLand] = useState({})
  const baseUrl = `https://api.decentraland.org/v2/parcels/${coord.x}/${coord.y}`

  const fetchLand = async () => {
    const res = await fetch(baseUrl)
    const json = await res.json()
    console.log(json)
    setLand(json)
  }

  // @ts-ignore
  const { id, name, description, image, external_url } = land

  useEffect(() => {
    fetchLand()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coord])

  return (
    <Box w={["100%", "100%", "100%", "20%"]} h={h}>
      <GridItem w={box.w} h="100%" mb="4" bg={box.bg} borderRadius="xl">
        <Box p="2">
          <Box p="2">
            <Text fontSize="xl">
              <a target="_blank" rel="noopener noreferrer" href={external_url}>
                name: {name}
              </a>
            </Text>
          </Box>
          <Box overflow="hidden" p="2" borderRadius="xl">
            <Image borderRadius="xl" alt="land" src={image} />
          </Box>
          <Box p="2">
            <Box>
              <Text>Description: {description ? description : "N/A"}</Text>
            </Box>
            {/* <Box>
              <Text>Id: {id ? id : "N/A"}</Text>
            </Box> */}
          </Box>
        </Box>
      </GridItem>
    </Box>
  )
}

export default MapInfo
