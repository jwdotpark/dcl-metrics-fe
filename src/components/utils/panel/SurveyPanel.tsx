import { useColorModeValue, Box } from "@chakra-ui/react"
import { Rnd } from "react-rnd"
import { PanelHeader } from "./PanelHeader"
import { useState, useEffect } from "react"
import { SurveyContainer } from "./survey"

export const SurveyPanel = ({ setOpen }) => {
  const [position, setPosition] = useState(null)

  useEffect(() => {
    const savedPosition = localStorage.getItem("surveyPanelPosition")
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition))
    } else {
      setPosition({
        x: -450,
        y: 50,
        width: 600,
        height: 1000,
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

  //const surveyUrl = "https://tally.so/r/wAK6Mo"

  return (
    <Rnd
      style={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f0f0",
        border: "1px solid",
        borderColor: "#A0AEC0",
        borderRadius: "12px",
        overflow: "hidden",
        zIndex: 999998,
        boxShadow: "0 0 5px rgba(0,0,0,0.4)",
      }}
      bounds="window"
      dragHandleClassName="handler"
      size={{ width: position.width, height: position.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      minWidth={300}
      minHeight={400}
    >
      <Box
        w="100%"
        h="100%"
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("gray.100", "gray.800")}
        shadow="xl"
      >
        <PanelHeader title="Survey" setOpen={setOpen} />
        <Box overflowY="auto" w="100%" h="100%" pb="8">
          <SurveyContainer />
          {/*<iframe
            src={surveyUrl}
            width="100%"
            height="100%"
            title="Survey Form"
          ></iframe>*/}
        </Box>
      </Box>
    </Rnd>
  )
}
