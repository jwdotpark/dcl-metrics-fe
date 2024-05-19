import React, { useState, useRef, useEffect } from "react"
import { Box, Grid, Text, Flex, Center } from "@chakra-ui/react"

const MapTilePicker = () => {
  const [zoomDisplay, setZoomDisplay] = useState(1)
  const zoomRef = useRef(1)
  const positionRef = useRef({ x: 0, y: 0 })
  const mapRef = useRef(null)
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const gridNum = { x: 5, y: 5 }

  const handleWheel = (e) => {
    e.preventDefault()
    const zoomChange = e.deltaY < 0 ? 0.1 : -0.1
    const newZoom = Math.min(Math.max(zoomRef.current + zoomChange, 0.5), 3)
    zoomRef.current = newZoom
    setZoomDisplay(newZoom)
    updateTransform()
  }

  const handleMouseDown = (e) => {
    isDragging.current = true
    dragStart.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y,
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      positionRef.current = {
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      }
      updateTransform()
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const updateTransform = () => {
    if (mapRef.current) {
      mapRef.current.style.transform = `scale(${zoomRef.current}) translate(${positionRef.current.x}px, ${positionRef.current.y}px)`
    }
  }

  useEffect(() => {
    const mapElement = mapRef.current
    mapElement.addEventListener("wheel", handleWheel)
    mapElement.addEventListener("mousedown", handleMouseDown)
    mapElement.addEventListener("mousemove", handleMouseMove)
    mapElement.addEventListener("mouseup", handleMouseUp)
    mapElement.addEventListener("mouseleave", handleMouseUp)

    return () => {
      mapElement.removeEventListener("wheel", handleWheel)
      mapElement.removeEventListener("mousedown", handleMouseDown)
      mapElement.removeEventListener("mousemove", handleMouseMove)
      mapElement.removeEventListener("mouseup", handleMouseUp)
      mapElement.removeEventListener("mouseleave", handleMouseUp)
    }
  }, [])

  return (
    <Box mb="4">
      <Box pos="relative" overflow="hidden" h="500px" bg="gray.100">
        <Center w="100%" h="100%">
          <Grid
            ref={mapRef}
            pos="absolute"
            gap={0}
            templateRows={`repeat(${gridNum.x}, 1fr)`}
            templateColumns={`repeat(${gridNum.y}, 1fr)`}
            w="100%"
            h="100%"
            transformOrigin="top left"
          >
            {Array.from({ length: 25 }).map((_, index) => {
              const row = Math.floor(index / 5)
              const col = index % 5
              return (
                <Flex
                  key={index}
                  align="center"
                  justify="center"
                  direction="column"
                  w="100%"
                  h="100%"
                  bg="white"
                  //border="1px solid black"
                  boxSizing="border-box"
                >
                  <Text>Row: {row}</Text>
                  <Text>Col: {col}</Text>
                  <Text>Zoom: {zoomDisplay.toFixed(1)}</Text>
                </Flex>
              )
            })}
          </Grid>
        </Center>
      </Box>
    </Box>
  )
}

export default MapTilePicker
