/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Box,
  Flex,
  Center,
  useColorModeValue,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react"
import { memo, ReactFragment, useCallback, useEffect, useState } from "react"
import { usePrev } from "../../../lib/hooks/usePrev"
import "react-tile-map/lib/styles.css"
import { Layer, TileMap } from "react-tile-map"
import { heatmapColor } from "../../../lib/hooks/utils"
import MapButtonGroup from "./partials/MapButtonGroup"
import CollapsibleMapBox from "./partials/CollapsibleMapBox"
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import { searchTiles } from "../../../lib/data/searchMap"
import { COLOR_BY_TYPE, heatmapProperties } from "../../../lib/data/constant"

const Map = ({
  h,
  coord,
  setCoord,
  selectedParcel,
  setSelectedParcel,
  isMapExpanded,
  setIsMapExpanded,
  mapBoxVerticalSize,
  mapHeight,
  parcelData,
  setMapHeight,
}) => {
  // map
  const [tempCoord, setTempCoord] = useState({
    x: 0,
    y: 0,
  })
  const [tiles, setTiles] = useState([])
  const [isMapLoading, setIsMapLoading] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [selected, setSelected] = useState([])
  const [selectedScene, setSelectedScene] = useState([])
  const prevScene = usePrev(selectedScene)
  const [center, setCenter] = useState({ x: 0, y: 0 })
  const [searchResult, setSearchResult] = useState([])
  const [keyword, setKeyword] = useState("")
  const [searchResultID, setSearchResultID] = useState({ x: 0, y: 0 })
  const handleFullscreen = useFullScreenHandle()
  const btnBg = useColorModeValue("gray.100", "gray.900")
  const textColor = useColorModeValue("gray.100", "gray.900")
  const [selectedProp, setSelectedProp] = useState(heatmapProperties[0])
  const prevTile = usePrev(sessionStorage.getItem("selectedParcelType"))

  // infobox
  const isIncluded = selectedScene?.includes(selectedParcel?.id)
  const { getButtonProps, getDisclosureProps, isOpen, onToggle } =
    useDisclosure()
  const [hidden, setHidden] = useState(!isOpen)
  const layers = []

  const isSelected = (x: number, y: number) => {
    return selected.some((coord) => coord.x === x && coord.y === y)
  }

  const selectedStrokeLayer: Layer = (x, y) => {
    const id = x + "," + y
    const tile = tiles[id]
    return isSelected(x, y)
      ? {
          color: "#F7007C",
          scale: 0.75,
          top: !!tile.top,
          left: !!tile.left,
          topLeft: !!tile.topLeft,
        }
      : null
  }

  const handleClick = (x: number, y: number) => {
    const id = x + "," + y

    // save selected coord
    setSelectedParcel(tiles[id])

    // load information of selected parcel
    if (isSelected(x, y)) {
      setSelected(selected.filter((coord) => coord.x !== x && coord.y !== y))
    } else {
      setSelected([{ x, y }])
    }

    // open up infobox of selected coord
    if (!isOpen) {
      onToggle()
    }

    // set tiles to be scene if it's scene
    if (selectedParcel && selectedParcel.scene) {
      setSelectedScene(selectedParcel.scene.parcels)
    }

    // panning map to center
    setCenter({ x: x, y: y })
  }

  const fetchTiles = async (
    url: string = "https://api.decentraland.org/v2/tiles"
  ) => {
    if (!window.fetch) return {}
    setIsMapLoading(true)
    try {
      const resp = await fetch(url, {
        cache: "force-cache",
      })
      const json = await resp.json()
      setTiles(json.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsMapLoading(false)
    }
  }

  const injectTiles = useCallback(() => {
    parcelData.map((tile) => {
      const id = tile.coordinates
      tiles[id] = { ...tiles[id], ...tile }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles])

  const tileColor = (tile) => {
    if (!tile[selectedProp.name]) {
      return COLOR_BY_TYPE[tile.type]
    }
    if (tile[selectedProp.name] > 0) {
      const value = tile[selectedProp.name]
      return heatmapColor(value)
    }
  }

  const layer = (x, y) => {
    const id = x + "," + y
    if (tiles && id in tiles) {
      const tile = tiles[id]
      return {
        color: tileColor(tile),
        top: !!tile.top,
        left: !!tile.left,
        topLeft: !!tile.topLeft,
        scale: 1,
        owner: tile.owner,
        estateId: tile.estateId,
        tokenId: tile.tokenId,
        type: tile.type,
        coordinate: tile?.coordinate,
        deploy_count: tile?.deploy_count,
        total_avg_time_spent: tile.total_avg_time_spent,
        total_avg_time_spent_afk: tile.total_avg_time_spent,
        total_logins: tile.total_logins,
        total_logouts: tile.total_logouts,
        total_visitors: tile.total_visitors,
        scene: tile.scene,
      }
    } else {
      return {
        color: (x + y) % 2 === 0 ? COLOR_BY_TYPE[13] : COLOR_BY_TYPE[14],
      }
    }
  }

  useEffect(() => {
    if (searchResultID.x !== 0 && searchResultID.y !== 0) {
      setCenter({ x: searchResultID.x, y: searchResultID.y })
      handleClick(searchResultID.x, searchResultID.y)
    }
  }, [searchResultID])

  useEffect(() => {
    setTimeout(() => {
      setSearchResult(searchTiles(tiles, keyword))
    }, 250)
  }, [keyword])

  useEffect(() => {
    fetchTiles()
  }, [])

  useEffect(() => {
    if (zoom < 0.7) {
      setZoom(0.7)
    }
  }, [zoom])

  useEffect(() => {
    injectTiles()
  }, [tiles])

  useEffect(() => {
    if (selectedParcel.type !== "selected_scene") {
      sessionStorage.setItem("selectedParcel", selectedParcel.id)
      sessionStorage.setItem("selectedParcelType", selectedParcel.type)
    }
    if (selectedParcel.scene) {
      selectedParcel.scene.parcels.map((tile) => {
        tiles[tile].type = "selected_scene"
      })
    }
  }, [selectedParcel])

  useEffect(() => {
    if (prevScene && !isIncluded) {
      // @ts-ignore
      prevScene.map((parcel) => {
        tiles[parcel].type = prevTile
      })
    }
  }, [isIncluded, prevScene, prevTile, tiles])

  let mapComponent: JSX.Element

  if (isMapLoading) {
    mapComponent = (
      <Center h={isMapExpanded ? mapHeight.expanded : mapHeight.collapsed}>
        <Spinner />
      </Center>
    )
  } else {
    mapComponent = (
      <>
        <Box>
          <MapButtonGroup
            isMapExpanded={isMapExpanded}
            setIsMapExpanded={setIsMapExpanded}
            zoom={zoom}
            setZoom={setZoom}
            tempCoord={tempCoord}
            heatmapProperties={heatmapProperties}
            selectedProp={selectedProp}
            setSelectedProp={setSelectedProp}
            textColor={textColor}
            btnBg={btnBg}
            handle={handleFullscreen}
            setMapHeight={setMapHeight}
            keyword={keyword}
            setKeyword={setKeyword}
            searchResult={searchResult}
            setSearchResultID={setSearchResultID}
          />
        </Box>
        <TileMap
          zoom={zoom}
          layers={[layer, selectedStrokeLayer, ...layers]}
          onHover={(x, y) => {
            setTempCoord({ x, y })
          }}
          onClick={(x, y) => {
            setCoord({ x, y })
            handleClick(x, y)
          }}
          onChange={(e) => {
            setZoom(e.zoom)
            setCenter(e.center)
          }}
          x={center.x}
          y={center.y}
        />
        <CollapsibleMapBox
          getButtonProps={getButtonProps}
          getDisclosureProps={getDisclosureProps}
          isOpen={isOpen}
          hidden={hidden}
          setHidden={setHidden}
          coord={coord}
          selectedParcel={selectedParcel}
          isMapExpanded={isMapExpanded}
          mapBoxVerticalSize={mapBoxVerticalSize}
          mapHeight={mapHeight}
          handle={handleFullscreen}
        />
      </>
    )
  }

  return (
    <Flex
      sx={{
        "& > * + *": {
          ml: [0, 0, 0, 0, 0],
          mt: [4, 4, 4, 0],
        },
      }}
      direction={[
        "column",
        "column",
        "column",
        "column",
        isMapExpanded ? "column" : "row",
      ]}
      m="4"
      border="solid 1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
      shadow="md"
    >
      <Box w="100%" h="auto" minH="350">
        <FullScreen handle={handleFullscreen}>
          <Box
            overflow="hidden"
            h={!isMapExpanded ? mapHeight.collapsed : mapHeight.expanded}
            bg="#25232A"
            borderRadius="xl"
            shadow="md"
          >
            {mapComponent}
          </Box>
        </FullScreen>
      </Box>
    </Flex>
  )
}

export default memo(Map)
