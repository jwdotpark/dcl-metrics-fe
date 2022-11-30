import { Box, Text, Button, useColorModeValue, Center } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import MapImage from "./MapImage"
import MapInfoTable from "./ParcelInfoTable"
import SceneInfoTable from "./SceneInfoTable"

const SceneInfoBox = ({ isMapExpanded, selectedParcel, coord, isIncluded }) => {
  const { estateId } = selectedParcel
  const { name } = selectedParcel.scene
  const baseUrl = `https://api.decentraland.org/v1/estates/${estateId}/map.png`

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
      {isMapExpanded && (
        <MapImage isPicLoading={false} name={name} image={baseUrl} />
      )}
      <SceneInfoTable selectedParcel={selectedParcel} />
    </Box>
  )
}

export default SceneInfoBox
