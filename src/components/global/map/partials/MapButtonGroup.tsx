import {
  Text,
  Box,
  Flex,
  Button,
  Spacer,
  ButtonGroup,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  Center,
} from "@chakra-ui/react"
import MapMenu from "./MapMenu"
import { FiChevronsDown, FiChevronsUp, FiSearch } from "react-icons/fi"
import { useEffect } from "react"
import SearchBox from "./SearchBox"

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
  handle,
  setMapHeight,
  keyword,
  setKeyword,
  searchResult,
}) => {
  const handleFullscreen = () => {
    if (!handle.active) {
      setMapHeight({ expanded: "98vh", collapsed: "98vh" })
      handle.enter()
    } else {
      setMapHeight({ collapsed: 500, expanded: "80vh" })
      handle.exit()
    }
  }

  // check if searchResult array is empty

  useEffect(() => {
    if (!handle.active) {
      setMapHeight({ collapsed: 500, expanded: "80vh" })
    }
  }, [handle.active, setMapHeight])

  return (
    <>
      <Flex pos="absolute" w="100%" p="2">
        <Box
          pos="absolute"
          zIndex="docked"
          top="2"
          left="2"
          bg={btnBg}
          borderRadius="xl"
          shadow="md"
        >
          <InputGroup>
            <InputLeftElement
              // eslint-disable-next-line react/no-children-prop
              children={
                <Box sx={{ transform: "translateY(-4px)" }}>
                  <FiSearch />
                </Box>
              }
            />
            <Input
              minW="300"
              borderTopRadius="xl"
              borderBottomRadius={searchResult.length > 0 ? "0" : "xl"}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Genesis Plaza"
              size="sm"
              type="text"
              variant="filled"
            />
          </InputGroup>
          {searchResult.length !== 0 && (
            <SearchBox searchResult={searchResult} />
          )}
        </Box>
        <Spacer />
        <Box>
          <Button
            className={`umami--click--fullscreen-button`}
            zIndex="docked"
            mr="2"
            bg={btnBg}
            borderRadius="xl"
            shadow="md"
            onClick={() => handleFullscreen()}
            size="sm"
            variant="solid"
          >
            {handle.active ? "Exit Fullscreen" : "Fullscreen"}
          </Button>
          <Button
            zIndex="docked"
            display={handle.active ? "none" : "inline-block"}
            bg={btnBg}
            borderRadius="xl"
            shadow="md"
            onClick={() => setIsMapExpanded(!isMapExpanded)}
            size="sm"
            variant="solid"
          >
            {isMapExpanded ? <FiChevronsUp /> : <FiChevronsDown />}
          </Button>
        </Box>
      </Flex>
      <Flex>
        <Box pos="absolute" zIndex="docked" bottom="2" left="2">
          <MapMenu
            btnBg={btnBg}
            properties={properties}
            selectedProp={selectedProp}
            setSelectedProp={setSelectedProp}
          />
        </Box>
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
              minW="70"
              bg={btnBg}
              borderRadius="xl"
              shadow="md"
              //isDisabled
              size="sm"
              variant="solid"
            >
              [{tempCoord.x},{tempCoord.y}]
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
