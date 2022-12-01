import { Box, Text, Button, useColorModeValue, Center } from "@chakra-ui/react"
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
  const { name, id, updatedAt, owner, tokenId } = selectedParcel

  useEffect(() => {
    fetchParcel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coord])

  return (
    <Box
      overflowY="scroll"
      w="100%"
      h={!isMapExpanded ? mapHeight.collapsed : mapHeight.expanded}
      p="2"
      bg={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
    >
      <Center>
        <Text fontSize="xl" fontWeight="bold">
          {selectedParcel ? "[" + selectedParcel.id + "]" : "Parcel"}
        </Text>
      </Center>
      {/* {isMapExpanded && (
        <MapImage isPicLoading={isPicLoading} name={name} image={image} />
      )} */}
      <MapImage isPicLoading={isPicLoading} name={name} image={image} />
      <ParcelInfoTable
        external_url={external_url}
        selectedParcel={selectedParcel}
        description={description}
      />
    </Box>
  )
}

export default ParcelInfoBox
