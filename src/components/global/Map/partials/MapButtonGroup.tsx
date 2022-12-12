import {
  Text,
  Box,
  Flex,
  Button,
  Spacer,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react"
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
      <Flex pos="absolute" w="100%" p="2">
        <Box>
          <Button
            zIndex="docked"
            bg={btnBg}
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
        <Box pos="absolute" zIndex="docked" top="2" right="2">
          <MapMenu
            btnBg={btnBg}
            properties={properties}
            selectedProp={selectedProp}
            setSelectedProp={setSelectedProp}
          />
        </Box>
      </Flex>
      <Flex>
        <Button
          pos="absolute"
          zIndex="docked"
          bottom="2"
          left="2"
          bg={useColorModeValue("gray.50", "gray.900")}
          borderRadius="xl"
          shadow="md"
          size="sm"
        >
          <Text as="kbd" color={useColorModeValue("black", "white")}>
            [{tempCoord.x},{tempCoord.y}]
          </Text>
        </Button>
        <Spacer />
        <Box pos="absolute" zIndex="docked" right="2" bottom="2" shadow="md">
          <ButtonGroup isAttached>
            <Button
              zIndex="docked"
              bg={btnBg}
              borderRadius="xl"
              shadow="md"
              onClick={() => setZoom(Number((zoom - 0.5).toFixed(1)))}
              size="sm"
              variant="solid"
            >
              -
            </Button>
            <Button
              zIndex="docked"
              bg={btnBg}
              borderRadius="xl"
              shadow="md"
              onClick={() => setZoom(Number((zoom + 0.5).toFixed(1)))}
              size="sm"
              variant="solid"
            >
              +
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </>
  )
}

export default MapButtonGroup
