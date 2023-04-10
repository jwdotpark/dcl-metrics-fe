import {
  Box,
  Flex,
  Button,
  Spacer,
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import MapMenu from "./MapMenu"
import { FiChevronsDown, FiChevronsUp, FiSearch } from "react-icons/fi"
import { useEffect, useState } from "react"
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
  setSearchResultID,
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

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      document.getElementById("search-result").focus()
    }
  }

  const [coordInput, setCoordInput] = useState({ x: 0, y: 0 })

  const handleSubmit = (e) => {
    e.preventDefault()

    const isXValid =
      !isNaN(coordInput.x) &&
      coordInput.x < 150 &&
      coordInput.x > -150 &&
      coordInput.x !== 0
    const isYValid =
      !isNaN(coordInput.y) &&
      coordInput.y < 150 &&
      coordInput.y > -150 &&
      coordInput.y !== 0

    if (isXValid && isYValid) {
      setSearchResultID({ x: coordInput.x, y: coordInput.y })
    }
  }

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
              id="search-input"
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              placeholder="Genesis Plaza"
              size="sm"
              type="text"
              variant="filled"
            />
          </InputGroup>
          {searchResult.length !== 0 && (
            <SearchBox
              searchResult={searchResult}
              setSearchResultID={setSearchResultID}
              isMapExpanded={isMapExpanded}
            />
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
            variant="outline"
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
            variant="outline"
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
              border="none"
              borderRadius="xl"
              shadow="md"
              onClick={() => setZoom(Number((zoom - 0.5).toFixed(1)))}
              size="sm"
              variant="outline"
            >
              -
            </Button>
            <form onSubmit={handleSubmit}>
              <Input
                w="50px"
                bg={btnBg}
                border="none"
                borderRadius="none"
                onChange={(e) =>
                  setCoordInput({ ...coordInput, x: parseInt(e.target.value) })
                }
                placeholder={tempCoord.x}
                size="sm"
                type="number"
                variant="filled"
              />
              <Input
                w="50px"
                bg={btnBg}
                border="none"
                borderRadius="none"
                id="y"
                onChange={(e) =>
                  setCoordInput({ ...coordInput, y: parseInt(e.target.value) })
                }
                placeholder={tempCoord.y}
                size="sm"
                type="number"
                variant="filled"
              />
              <Button display="none" type="submit">
                Submit
              </Button>
            </form>
            <Button
              zIndex="docked"
              bg={btnBg}
              border="none"
              borderRadius="xl"
              shadow="md"
              onClick={() => setZoom(Number((zoom + 0.5).toFixed(1)))}
              size="sm"
              variant="outline"
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
