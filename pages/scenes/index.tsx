import { useBreakpointValue, Grid, Box } from "@chakra-ui/react"
import Layout from "../../src/components/layout/layout"
import staticScene from "../../public/data/cached_scenes_top.json"
import ScenesLogin from "../../src/components/local/stats/scenes/ScenesLogin"
import ScenesLogout from "../../src/components/local/stats/scenes/ScenesLogout"
import ScenesTimeSpent from "../../src/components/local/stats/scenes/ScenesTimeSpent"
import ScenesTimeSpentAFK from "../../src/components/local/stats/scenes/ScenesTimeSpentAFK"
import TopScenesVisitors from "../../src/components/local/stats/scenes/TopScenesVisitors"
import { getData, getDataWithApiKey, writeFile } from "../../src/lib/data/fetch"
import {
  globalScenesURL,
  isDev,
  isLocal,
  isProd,
  sceneURL,
} from "../../src/lib/data/constant"
import staticGlobalScenes from "../../public/data/staticGlobalScene.json"
import SceneTable from "../../src/components/local/stats/SceneTable"

export async function getStaticProps() {
  let globalSceneRes, sceneRes

  if (isProd) {
    globalSceneRes = await getDataWithApiKey(
      globalScenesURL,
      "/global/scenes",
      staticGlobalScenes
    )
    sceneRes = await getDataWithApiKey(sceneURL, "/scenes/top", staticScene)
  } else if (isDev && !isLocal) {
    globalSceneRes = await getData(
      globalScenesURL,
      "/global/scenes",
      staticGlobalScenes
    )
    sceneRes = await getData(sceneURL, "/scenes/top", staticScene)
  } else if (isLocal) {
    globalSceneRes = staticGlobalScenes
    sceneRes = staticScene
  }

  const sceneFileNameArr = ["staticGlobalScenes", "staticScene"]
  for (let i = 0; i < sceneFileNameArr.length; i++) {
    writeFile(sceneFileNameArr[i], [globalSceneRes, sceneRes][i])
  }

  return {
    props: {
      globalSceneRes,
      sceneRes,
    },
  }
}

const Scenes = (props: Props) => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const { globalSceneRes, sceneRes } = props

  return (
    <Layout>
      <Box mb="4">
        <SceneTable sceneRes={sceneRes} />
      </Box>
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
        <TopScenesVisitors res={globalSceneRes} />
        <ScenesTimeSpent res={globalSceneRes} />
        <ScenesLogin res={globalSceneRes} />
        <ScenesLogout res={globalSceneRes} />
        <ScenesTimeSpentAFK res={globalSceneRes} />
      </Grid>
    </Layout>
  )
}

export default Scenes
