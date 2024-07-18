import { useBreakpointValue, Grid, Box } from "@chakra-ui/react"
import Layout from "../../src/components/layout/layout"
import staticScene from "../../public/data/cached_scenes_top.json"
import ScenesLogin from "../../src/components/local/stats/scenes/ScenesLogin"
import ScenesLogout from "../../src/components/local/stats/scenes/ScenesLogout"
import ScenesTimeSpent from "../../src/components/local/stats/scenes/ScenesTimeSpent"
import ScenesTimeSpentAFK from "../../src/components/local/stats/scenes/ScenesTimeSpentAFK"
import TopScenesVisitors from "../../src/components/local/stats/scenes/TopScenesVisitors"
import { getDataWithApiKey, writeFile } from "../../src/lib/data/fetch"
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
    globalSceneRes = staticGlobalScenes
    sceneRes = staticScene
  }

  const sceneFileNameArr = ["staticGlobalScenes", "staticScene"]
  for (let i = 0; i < sceneFileNameArr.length; i++) {
    writeFile(sceneFileNameArr[i], [globalSceneRes, sceneRes][i])
  }

  const url = `http://api.dcl-metrics.com/scenes/compare?range=7&uuid=6c3717aa-b658-4ece-8ae0-84d3d9f24d3b,af079889-64ea-455b-864a-d446fdf4551f,043528aa-139f-47b4-a7d3-d784b54b35bb,2c4a9c84-6fc9-419d-ab4b-83d8b6cc102b,0d36e195-a50f-46a9-b7ef-4de3599649e0,197bd709-d013-4305-bf3d-1f3e7cfd9acc,e668e52e-624a-4a7f-853d-6fbce4c46fba,c0c49de0-6656-4bfb-934f-8b03b4f9a448,040b7707-1e71-4ffa-8e45-870db0f9fcc4,20fc8c08-5383-4724-b5b3-dbfd6ea0bd90&metric=visitors`
  const testData = await getDataWithApiKey(url, url, {})

  return {
    props: {
      globalSceneRes,
      sceneRes,
      testData,
    },
  }
}

const Scenes = (props: Props) => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const { globalSceneRes, sceneRes, testData } = props
  console.log("testData", testData)

  const pageTitle = "DCL-Metrics Scenes"
  const description =
    "Uncover trending scenes, popular categories, and user ratings, allowing you to discover the hottest and most captivating experiences in Decentraland."
  const image = `${siteUrl}/images/scenes.png`

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

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
          <SceneCharts sceneRes={sceneRes} />
        </Box>
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
    </>
  )
}

export default Scenes
