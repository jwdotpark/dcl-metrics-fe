// @ts-nocheck
import { useBreakpointValue, Grid, useColorModeValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import staticGlobal from "../public/data/cached_global_response.json"
import staticScene from "../public/data/top_scenes.json"
import { useAtom } from "jotai"
import { DataAtom, LoadingStateAtom } from "../src/lib/hooks/atoms"

import Scene from "../src/components/local/stats/Scene"
import ScenesLogin from "../src/components/local/stats/scenes/ScenesLogin"
import ScenesLogout from "../src/components/local/stats/scenes/ScenesLogout"
import ScenesTimeSpent from "../src/components/local/stats/scenes/ScenesTimeSpent"
import ScenesTimeSpentAFK from "../src/components/local/stats/scenes/ScenesTimeSpentAFK"
import TopScenesVisitors from "../src/components/local/stats/scenes/TopScenesVisitors"

const Scenes = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const [data] = useAtom(DataAtom)
  const [isDataLoading] = useAtom(LoadingStateAtom)
  const result = data.length !== 0 ? data : staticGlobal

  return (
    <Layout>
      <Scene res={staticScene} />
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
        <TopScenesVisitors res={result.scenes} isSceneLoading={isDataLoading} />
        <ScenesTimeSpent res={result.scenes} isSceneLoading={isDataLoading} />
        <ScenesLogin res={result.scenes} isSceneLoading={isDataLoading} />
        <ScenesLogout res={result.scenes} isSceneLoading={isDataLoading} />
        <ScenesTimeSpentAFK
          res={result.scenes}
          isSceneLoading={isDataLoading}
        />
      </Grid>
    </Layout>
  )
}

export default Scenes
