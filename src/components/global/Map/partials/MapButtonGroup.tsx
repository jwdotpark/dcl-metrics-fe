import { Text, Box, Flex, Button, Spacer, ButtonGroup } from "@chakra-ui/react"
import MapMenu from "./MapMenu"

const MapButtonGroup = ({
  isMapExpanded,
  setIsMapExpanded,
  zoom,
  setZoom,
  tempCoord,
  properties,
  selectedProp,
  setSelectedProp,
  textColor,
  btnBg,
}) => {
  return (
    <>
      <Flex pos="absolute" zIndex="banner" w="100%" p="2">
        <Box>
          <Button
            borderRadius="xl"
            shadow="md"
            onClick={() => setIsMapExpanded(!isMapExpanded)}
            size="sm"
            variant="solid"
          >
            {isMapExpanded ? "Collapse" : "Expand"}
          </Button>
        </Box>
        <Spacer />
        <Box>
          <ButtonGroup isAttached>
            <Button
              borderRadius="xl"
              shadow="md"
              onClick={() => setZoom(Number((zoom - 0.2).toFixed(1)))}
              size="sm"
              variant="solid"
            >
              -
            </Button>
            <Button
              borderRadius="xl"
              shadow="md"
              onClick={() => setZoom(Number((zoom + 0.2).toFixed(1)))}
              size="sm"
              variant="solid"
            >
              +
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
      <Flex>
        <Box pos="absolute" zIndex="banner" bottom="2" left="2">
          <Text color="gray.100" textShadow="md">
            [{tempCoord.x}, {tempCoord.y}]
          </Text>
        </Box>
        <Spacer />
        <Box pos="absolute" zIndex="banner" right="2" bottom="2" shadow="md">
          <MapMenu
            textColor={textColor}
            btnBg={btnBg}
            properties={properties}
            selectedProp={selectedProp}
            setSelectedProp={setSelectedProp}
          />
        </Box>
      </Flex>
    </>
  )
}

export default MapButtonGroup
