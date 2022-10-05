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

const SceneLayout = ({ result, isDataLoading }) => {
  const gridColumn = useBreakpointValue({
    md: 1,
    lg: 2,
    xl: 2,
  })
  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          bg={useColorModeValue("gray.300", "gray.600")}
          _hover={{
            bg: useColorModeValue("gray.400", "gray.700"),
          }}
          _expanded={{
            bg: useColorModeValue("gray.300", "gray.600"),
            color: useColorModeValue("gray.800", "white"),
          }}
        >
          <Box flex="1" py="2" textAlign="center">
            <Text fontSize="2xl" fontWeight="semibold">
              SCENE
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
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
