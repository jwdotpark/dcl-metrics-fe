import { useBreakpointValue, Grid, Box } from "@chakra-ui/react"
import Layout from "../../src/components/layout/layout"
import staticScene from "../../public/data/cached_scenes_top.json"
import ScenesLogin from "../../src/components/local/stats/scenes/ScenesLogin"
import ScenesLogout from "../../src/components/local/stats/scenes/ScenesLogout"
import ScenesTimeSpent from "../../src/components/local/stats/scenes/ScenesTimeSpent"
import ScenesTimeSpentAFK from "../../src/components/local/stats/scenes/ScenesTimeSpentAFK"
import TopScenesVisitors from "../../src/components/local/stats/scenes/TopScenesVisitors"
import {
  getDataWithApiKey,
  //writeFile
} from "../../src/lib/data/fetch"
import {
  globalScenesURL,
  isDev,
  isLocal,
  isProd,
  sceneURL,
} from "../../src/lib/data/constant"
import staticGlobalScenes from "../../public/data/staticGlobalScene.json"
import SceneTable from "../../src/components/local/stats/SceneTable"
import { generateMetaData, siteUrl } from "../../src/lib/data/metadata"
import { NextSeo } from "next-seo"
import SearchScene from "../../src/components/local/stats/user/SearchScene"
import SceneCharts from "../../src/components/local/stats/SceneCharts"
import { useState } from "react"

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
    globalSceneRes = await getDataWithApiKey(
      globalScenesURL,
      "/global/scenes",
      staticGlobalScenes
    )
    sceneRes = await getDataWithApiKey(sceneURL, "/scenes/top", staticScene)
  } else if (isLocal) {
    globalSceneRes = await getDataWithApiKey(
      globalScenesURL,
      "/global/scenes",
      staticGlobalScenes
    )
    sceneRes = await getDataWithApiKey(sceneURL, "/scenes/top", staticScene)
    //globalSceneRes = staticGlobalScenes
    //sceneRes = staticScene
  }

  //const sceneFileNameArr = ["staticGlobalScenes", "staticScene"]
  //for (let i = 0; i < sceneFileNameArr.length; i++) {
  //  writeFile(sceneFileNameArr[i], [globalSceneRes, sceneRes][i])
  //}

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

  const pageTitle = "DCL-Metrics Scenes"
  const description =
    "Uncover trending scenes, popular categories, and user ratings, allowing you to discover the hottest and most captivating experiences in Decentraland."
  const image = `${siteUrl}/images/scenes.png`

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  const [pageIndex, setPageIndex] = useState(0)

  return (
    <>
      <NextSeo
        title={metaData.title}
        description={metaData.description}
        openGraph={{
          url: siteUrl + "/scenes",
          title: metaData.title,
          description: metaData.description,
          images: [
            {
              url: metaData.image,
              width: 400,
              height: 400,
              alt: metaData.description,
              type: "image/png",
            },
          ],
          siteName: "DCL-Metrics",
        }}
      />
      <Layout>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <SearchScene />
        </Grid>
        <Box mb="4">
          <SceneTable sceneRes={sceneRes} setPageIndex={setPageIndex} />
        </Box>
        <Box mb="4">
          <SceneCharts sceneRes={sceneRes} pageIndex={pageIndex} />
        </Box>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <TopScenesVisitors res={globalSceneRes} />
          <ScenesTimeSpent res={globalSceneRes} />
          <ScenesLogin res={globalSceneRes} />
          <ScenesLogout res={globalSceneRes} />
          <ScenesTimeSpentAFK res={globalSceneRes} />
        </Grid>
      </Layout>
    </>
  )
}

export default Scenes
