import { useColorModeValue, Box } from "@chakra-ui/react"
import { Rnd } from "react-rnd"
import { PanelHeader } from "./PanelHeader"
import { useState, useEffect } from "react"
import SurveyContainer from "./survey"

export const SurveyPanel = ({ setOpen }) => {
  const [position, setPosition] = useState(null)
  const bg = useColorModeValue("gray.50", "gray.700")

  useEffect(() => {
    const savedPosition = localStorage.getItem("surveyPanelPosition")
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition))
    } else {
      setPosition({
        x: -450,
        y: 50,
        width: 500,
        height: 500,
      })
    }
  }, [])

  const handleDragStop = (e, d) => {
    const newPosition = { ...position, x: d.x, y: d.y }
    setPosition(newPosition)
    localStorage.setItem("surveyPanelPosition", JSON.stringify(newPosition))
  }

  const handleResizeStop = (e, direction, ref, delta, position) => {
    const newSize = {
      x: position.x,
      y: position.y,
      width: ref.style.width,
      height: ref.style.height,
    }
    setPosition(newSize)
    localStorage.setItem("surveyPanelPosition", JSON.stringify(newSize))
  }

  if (!position) {
    return null
  }

  return (
    <Rnd
      style={{
        position: "fixed",
        display: "flex",
        background: "#f0f0f0",
        border: "1px solid",
        borderColor: "#A0AEC0",
        borderRadius: "12px",
        overflow: "hidden",
        zIndex: 10,
        boxShadow: "0 0 5px rgba(0,0,0,0.4)",
      }}
      bounds="window"
      dragHandleClassName="handler"
      size={{ width: position.width, height: position.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      minWidth={500}
      minHeight={500}
      maxWidth={500}
      maxHeight={500}
    >
      <Box w="100%" h="100%" bg={bg} shadow="2xl">
        <PanelHeader title="Survey" setOpen={setOpen} />
        <SurveyContainer />
      </Box>
    </Rnd>
  )
}
