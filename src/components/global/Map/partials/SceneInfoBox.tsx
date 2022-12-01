import { Box, Text, Button, useColorModeValue, Center } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import MapImage from "./MapImage"
import MapInfoTable from "./ParcelInfoTable"
import SceneInfoTable from "./SceneInfoTable"

const SceneInfoBox = ({
  isMapExpanded,
  selectedParcel,
  coord,
  isIncluded,
  mapHeight,
}) => {
  const { estateId } = selectedParcel
  const { name } = selectedParcel.scene
  const baseUrl = `https://api.decentraland.org/v1/estates/${estateId}/map.png`

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
          Scene
        </Text>
      </Center>
      {/* {isMapExpanded && (
        <MapImage isPicLoading={false} name={name} image={baseUrl} />
      )} */}
      <MapImage isPicLoading={false} name={name} image={baseUrl} />
      <SceneInfoTable selectedParcel={selectedParcel} />
    </Box>
  )
}

export default SceneInfoBox
