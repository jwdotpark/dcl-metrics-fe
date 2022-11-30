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
            zIndex="banner"
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
        <Box>
          <ButtonGroup isAttached>
            <Button
              zIndex="banner"
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
              zIndex="banner"
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
      <Flex>
        <Button
          pos="absolute"
          zIndex="banner"
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
