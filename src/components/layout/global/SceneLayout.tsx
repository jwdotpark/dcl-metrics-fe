import {
  AccordionItem,
  useColorModeValue,
  AccordionPanel,
  Grid,
  useBreakpointValue,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react"
import Scene from "../../local/stats/Scene"
import ScenesLogin from "../../local/stats/scenes/ScenesLogin"
import ScenesLogout from "../../local/stats/scenes/ScenesLogout"
import ScenesTimeSpent from "../../local/stats/scenes/ScenesTimeSpent"
import ScenesTimeSpentAFK from "../../local/stats/scenes/ScenesTimeSpentAFK"
import TopScenesVisitors from "../../local/stats/scenes/TopScenesVisitors"
import AccordionLabel from "../global/partials/AccordionLabel"
import AccordionViewMore from "../global/partials/AccordionViewMore"

const SceneLayout = ({ result, sceneResult }) => {
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
        <Scene
          res={sceneResult}
          date=""
          setDate={{}}
          availableDate={[]}
          dailyUsers={{}}
        />
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <TopScenesVisitors res={result.scenes} />
          <ScenesTimeSpent res={result.scenes} />
        </Grid>
        <Collapse animateOpacity in={isOpen}>
          <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
            <ScenesLogin res={result.scenes} />
            <ScenesLogout res={result.scenes} />
            <ScenesTimeSpentAFK res={result.scenes} />
          </Grid>
        </Collapse>
        <AccordionViewMore isOpen={isOpen} onToggle={onToggle} />
      </AccordionPanel>
    </AccordionItem>
  )
}

export default SceneLayout
