import { Box, Image } from "@chakra-ui/react"
import { useEffect, useState, useRef } from "react"
import BoxWrapper from "../../layout/local/BoxWrapper"

const TileMapWrapper = ({
  initialStartX = -10,
  initialStartY = -10,
  initialEndX = 10,
  initialEndY = 10,
}) => {
  const tileSize = 128 // Tile size in pixels
  const [tiles, setTiles] = useState([])
  const mapRef = useRef(null) // Reference to the map container
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 })
  const [startX, setStartX] = useState(initialStartX)
  const [startY, setStartY] = useState(initialStartY)
  const [endX, setEndX] = useState(initialEndX)
  const [endY, setEndY] = useState(initialEndY)

  const loadTiles = async (newStartX, newStartY, newEndX, newEndY) => {
    let fetchedTiles = []
    for (let x = newStartX; x <= newEndX; x++) {
      for (let y = newEndY; y >= newStartY; y--) {
        const tileSrc = `https://genesis.city/api/v1/land/${x},${y}.jpg`
        fetchedTiles.push(
          <Image
            key={`${x},${y}`}
            alt={`Tile ${x},${y}`}
            src={tileSrc}
            style={{
              position: "absolute",
              left: (x - startX) * tileSize,
              top: (endY - y) * tileSize,
              width: tileSize,
              height: tileSize,
            }}
          />
        )
      }
    }
    setTiles((prevTiles) => [...prevTiles, ...fetchedTiles])
  }

  useEffect(() => {
    loadTiles(startX, startY, endX, endY)
  }, [startX])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartPos({ x: e.clientX - currentPos.x, y: e.clientY - currentPos.y })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const newCurrentPos = {
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    }
    setCurrentPos(newCurrentPos)

    const deltaX = Math.floor(newCurrentPos.x / tileSize)
    const deltaY = Math.floor(newCurrentPos.y / tileSize)

    if (deltaX !== 0 || deltaY !== 0) {
      setStartX(startX - deltaX)
      setStartY(startY - deltaY)
      setEndX(endX - deltaX)
      setEndY(endY - deltaY)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <Box mb="4">
      <BoxWrapper colSpan={0}>
        <Box h="100%" m="4">
          <Box
            overflow="hidden"
            h="500px"
            border="1px"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div
              ref={mapRef}
              style={{
                position: "relative",
                width: (endX - startX + 1) * tileSize,
                height: (endY - startY + 1) * tileSize,
                transform: `translate(${currentPos.x}px, ${currentPos.y}px)`,
                cursor: isDragging ? "grabbing" : "grab",
              }}
            >
              {tiles}
            </div>
          </Box>
        </Box>
      </BoxWrapper>
    </Box>
  )
}

export default TileMapWrapper
