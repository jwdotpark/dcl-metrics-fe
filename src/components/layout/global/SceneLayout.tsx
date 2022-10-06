import {
  Box,
  AccordionItem,
  AccordionButton,
  useColorModeValue,
  AccordionIcon,
  AccordionPanel,
  Grid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import ScenesLogin from "../../local/stats/scenes/ScenesLogin"
import ScenesLogout from "../../local/stats/scenes/ScenesLogout"
import ScenesTimeSpent from "../../local/stats/scenes/ScenesTimeSpent"
import ScenesTimeSpentAFK from "../../local/stats/scenes/ScenesTimeSpentAFK"
import TopScenesVisitors from "../../local/stats/scenes/TopScenesVisitors"
import AccordionLabel from "./partials/AccordionLabel"

const SceneLayout = ({ result, isDataLoading }) => {
  const gridColumn = useBreakpointValue({
    md: 1,
    lg: 2,
    xl: 2,
  })
  return (
    <AccordionItem>
      <AccordionLabel name="Scenes" />
      <AccordionPanel pb={4} bg={useColorModeValue("gray.300", "gray.600")}>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <TopScenesVisitors
            res={result.scenes}
            isSceneLoading={isDataLoading}
          />
          <ScenesTimeSpent res={result.scenes} isSceneLoading={isDataLoading} />
          <ScenesLogin res={result.scenes} isSceneLoading={isDataLoading} />
          <ScenesLogout res={result.scenes} isSceneLoading={isDataLoading} />
          <ScenesTimeSpentAFK
            res={result.scenes}
            isSceneLoading={isDataLoading}
          />
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default SceneLayout
