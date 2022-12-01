import { Box, Text, useColorModeValue, Center } from "@chakra-ui/react"
import MapImage from "./MapImage"
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
      shadow="md"
    >
      <Center px="4">
        <Text fontSize="xl" fontWeight="bold" noOfLines={1}>
          {name ? name : "Scene"}
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
