import { useColorModeValue, Box } from "@chakra-ui/react"
import { Rnd } from "react-rnd"
import { PanelHeader } from "./PanelHeader"

export const SurveyPanel = ({ setOpen }) => {
  const defaultPosition = {
    x: -200,
    y: 50,
    width: 400,
    height: 800,
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
        <Box overflowY="auto" w="100%" h="100%" mt="4">
          survey
        </Box>
      </Box>
    </Rnd>
  )
}
