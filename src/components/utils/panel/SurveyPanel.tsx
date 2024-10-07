import { useColorModeValue, Box } from "@chakra-ui/react"
import { Rnd } from "react-rnd"
import { PanelHeader } from "./PanelHeader"

export const SurveyPanel = ({ setOpen }) => {
  const defaultPosition = {
    x: -450,
    y: 50,
    width: 600,
    height: 1000,
  }
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
      default={defaultPosition}
      minWidth={300}
      minHeight={400}
    >
      <Box
        w="100%"
        h="100%"
        bg={useColorModeValue("gray.100", "gray.800")}
        shadow="xl"
      >
        <PanelHeader title="Survey" setOpen={setOpen} />
        <Box overflowY="auto" w="100%" h="100%" pb="16">
          <iframe
            src="https://tally.so/r/wAK6Mo"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Survey Form"
          ></iframe>
        </Box>
      </Box>
    </Rnd>
  )
}
