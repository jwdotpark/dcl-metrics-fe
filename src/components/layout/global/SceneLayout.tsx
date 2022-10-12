import {
  AccordionItem,
  useColorModeValue,
  AccordionPanel,
  Grid,
  useBreakpointValue,
  useDisclosure,
  Box,
  Collapse,
  Button,
} from "@chakra-ui/react"
import staticScene from "../../../../public/data/top_scenes.json"
import Scene from "../../local/stats/Scene"
import ScenesLogin from "../../local/stats/scenes/ScenesLogin"
import ScenesLogout from "../../local/stats/scenes/ScenesLogout"
import ScenesTimeSpent from "../../local/stats/scenes/ScenesTimeSpent"
import ScenesTimeSpentAFK from "../../local/stats/scenes/ScenesTimeSpentAFK"
import TopScenesVisitors from "../../local/stats/scenes/TopScenesVisitors"
import AccordionLabel from "../global/partials/AccordionLabel"
import AccordionViewMore from "../global/partials/AccordionViewMore"

const SceneLayout = ({ result, isDataLoading }) => {
  const gridColumn = useBreakpointValue({
    md: 1,
    lg: 2,
    xl: 2,
  })
  const { isOpen, onToggle } = useDisclosure()
  return (
    <AccordionItem border="none">
      <AccordionLabel name="Scenes" />
      <AccordionPanel pb={4} bg={useColorModeValue("gray.300", "gray.600")}>
        <Scene res={staticScene} />
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <TopScenesVisitors
            res={result.scenes}
            isSceneLoading={isDataLoading}
          />
          <ScenesTimeSpent res={result.scenes} isSceneLoading={isDataLoading} />
        </Grid>
        <Collapse animateOpacity in={isOpen}>
          <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
            <ScenesLogin res={result.scenes} isSceneLoading={isDataLoading} />
            <ScenesLogout res={result.scenes} isSceneLoading={isDataLoading} />
            <ScenesTimeSpentAFK
              res={result.scenes}
              isSceneLoading={isDataLoading}
            />
          </Grid>
        </Collapse>
        <AccordionViewMore isOpen={isOpen} onToggle={onToggle} />
      </AccordionPanel>
    </AccordionItem>
  )
}

export default SceneLayout
