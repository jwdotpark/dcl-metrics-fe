import React, { useState, useRef, useEffect } from "react"
import { Box, Flex, Text, Center } from "@chakra-ui/react"

const MapTilePicker = () => {
  const [zoomDisplay, setZoomDisplay] = useState(1)
  const zoomRef = useRef(1)
  const positionRef = useRef({ x: 0, y: 0 })
  const mapRef = useRef(null)
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const gridNum = { x: 5, y: 5 }
  const logicalGridSize = 301 // From -150 to 150 inclusive
  const canvasRef = useRef(null)

  //useEffect(() => {
  //  const canvas = canvasRef.current
  //  const ctx = canvas.getContext("2d")
  //  const cellSize = 2 // Adjust cell size as needed for performance

  //  ctx.clearRect(0, 0, canvas.width, canvas.height)
  //  ctx.strokeStyle = "rgba(0, 0, 0, 1)"

  //  // Calculate the size of the logical grid area based on zoom and canvas size
  //  const gridSize = logicalGridSize / zoomRef.current
  //  const halfGridSize = gridSize / 2
  //  const startX = positionRef.current.x - halfGridSize
  //  const startY = positionRef.current.y - halfGridSize

  //  // Draw grid lines
  //  for (let x = startX; x <= startX + gridSize; x += cellSize) {
  //    ctx.beginPath()
  //    ctx.moveTo(x, startY)
  //    ctx.lineTo(x, startY + gridSize)
  //    ctx.stroke()
  //  }

  //  for (let y = startY; y <= startY + gridSize; y += cellSize) {
  //    ctx.beginPath()
  //    ctx.moveTo(startX, y)
  //    ctx.lineTo(startX + gridSize, y)
  //    ctx.stroke()
  //  }
  //}, [zoomDisplay, positionRef.current])

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
          <Box ref={mapRef} pos="relative" w="100%" h="100%">
            {/* Canvas for Logical Grid */}
            {/*<canvas
              ref={canvasRef}
              width={logicalGridSize}
              height={logicalGridSize}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 99999,
                border: "1px solid",
              }}
              onMouseEnter={() => canvasRef.current.focus()}
            />*/}
            {/* Existing Grid */}
            <Box
              pos="absolute"
              zIndex={2}
              top="0"
              left="0"
              overflow="hidden"
              w="100%"
              h="100%"
            >
              {Array.from({ length: gridNum.x * gridNum.y }).map((_, index) => {
                const row = Math.floor(index / gridNum.x)
                const col = index % gridNum.x
                return (
                  <Flex
                    key={index}
                    pos="absolute"
                    top={`${row * (100 / gridNum.y)}%`}
                    left={`${col * (100 / gridNum.x)}%`}
                    align="center"
                    justify="center"
                    direction="column"
                    w={`${100 / gridNum.x}%`}
                    h={`${100 / gridNum.y}%`}
                    bg="white"
                    border="1px solid black"
                    boxSizing="border-box"
                  >
                    <Text>Row: {row}</Text>
                    <Text>Col: {col}</Text>
                    <Text>Zoom: {zoomDisplay.toFixed(1)}</Text>
                  </Flex>
                )
              })}
            </Box>
          </Box>
        </Center>
      </Box>
    </Box>
  )
}

export default MapTilePicker
