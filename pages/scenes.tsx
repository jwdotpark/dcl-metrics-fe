import { useBreakpointValue, Grid } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import staticScene from "../public/data/cached_scenes_top.json"
import Scene from "../src/components/local/stats/Scene"
import ScenesLogin from "../src/components/local/stats/scenes/ScenesLogin"
import ScenesLogout from "../src/components/local/stats/scenes/ScenesLogout"
import ScenesTimeSpent from "../src/components/local/stats/scenes/ScenesTimeSpent"
import ScenesTimeSpentAFK from "../src/components/local/stats/scenes/ScenesTimeSpentAFK"
import TopScenesVisitors from "../src/components/local/stats/scenes/TopScenesVisitors"
import { getData, getDataWithProxy } from "../src/lib/data/fetch"
import {
  globalScenesURL,
  isDev,
  isLocal,
  isProd,
  sceneURL,
  time,
} from "../src/lib/data/constant"
import staticGlobalScenes from "../public/data/staticGlobalScene.json"

export async function getStaticProps() {
  if (isProd) {
    const globalSceneRes = await getDataWithProxy(
      globalScenesURL,
      "/global/scenes",
      staticGlobalScenes
    )
    const sceneRes = await getDataWithProxy(
      sceneURL,
      "/scenes/top",
      staticScene
    )
    const result = { globalSceneRes, sceneRes }
    return {
      props: result,
      revalidate: time,
    }
  } else if (isDev && !isLocal) {
    const globalSceneRes = await getData(
      globalScenesURL,
      "/global/scenes",
      staticGlobalScenes
    )
    const sceneRes = await getData(sceneURL, "/scenes/top", staticScene)

    const result = { globalSceneRes, sceneRes }
    return {
      props: result,
      revalidate: time,
    }
  } else if (isLocal) {
    const globalSceneRes = staticGlobalScenes
    const sceneRes = staticScene
    const result = { globalSceneRes, sceneRes }
    return {
      props: result,
      revalidate: time,
    }
  }
}

const Scenes = (props: Props) => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const { globalSceneRes, sceneRes } = props

  return (
    <Layout>
      <Scene
        res={sceneRes}
        date=""
        setDate={{}}
        availableDate={[]}
        dailyUsers={{}}
      />
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
