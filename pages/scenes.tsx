import { useBreakpointValue, Grid, useColorModeValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import staticGlobal from "../public/data/cached_global_response.json"
import staticScene from "../public/data/cached_scenes_top.json"
import { useAtom } from "jotai"
import {
  DataAtom,
  LoadingStateAtom,
  SceneDataAtom,
} from "../src/lib/hooks/atoms"
import { sendNotification } from "../src/lib/hooks/sendNotification"
const axios = require("axios").default
import fs from "fs"

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
    const globalSceneRes = getDataWithProxy(
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

  //const day = 60 * 60 * 24 * 365
  //const isProd = process.env.NEXT_PUBLIC_STAGING === "false"

  //const url = isProd
  //  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "global"
  //  : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "global"

  //const sceneURL = isProd
  //  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "scenes/top"
  //  : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "scenes/top"

  //// TODO refactor below!

  //// prod endpoint
  //if (process.env.NEXT_PUBLIC_STAGING === "false") {
  //  const response = await axios
  //    .get(url, {
  //      method: "get",
  //      proxy: {
  //        protocol: "http",
  //        host: process.env.FIXIE_HOST,
  //        port: 80,
  //        auth: {
  //          username: "fixie",
  //          password: process.env.FIXIE_TOKEN,
  //        },
  //      },
  //    })
  //    .catch((error) => {
  //      console.log(error)
  //      return { props: { data: staticGlobal }, revalidate: day }
  //    })

  //  if (response.status !== 200) {
  //    sendNotification(response, "global", "error")
  //  }

  //  const sceneResponse = await axios
  //    .get(sceneURL, {
  //      method: "get",
  //      proxy: {
  //        protocol: "http",
  //        host: process.env.FIXIE_HOST,
  //        port: 80,
  //        auth: {
  //          username: "fixie",
  //          password: process.env.FIXIE_TOKEN,
  //        },
  //      },
  //    })
  //    .catch((error) => {
  //      console.log(error)
  //      return { props: { data: staticScene }, revalidate: day }
  //    })

  //  if (sceneResponse.status === 200) {
  //    fs.writeFileSync(
  //      "./public/data/cached_scenes_top.json",
  //      JSON.stringify(sceneResponse.data)
  //    )
  //  } else if (sceneResponse.status !== 200) {
  //    sendNotification(sceneResponse, "scenes/top", "error")
  //  }

  //  const data = response.data
  //  const sceneData = sceneResponse.data
  //  return {
  //    props: { data, sceneData },
  //    revalidate: day,
  //  }

  //  // staging endpoint
  //} else if (
  //  process.env.NEXT_PUBLIC_STAGING === "true" &&
  //  process.env.LOCAL !== "true"
  //) {
  //  const response = await fetch(url)
  //  const data = await response.json()
  //  const sceneResponse = await fetch(sceneURL)
  //  const sceneData = await sceneResponse.json()

  //  if (response.status !== 200 || sceneResponse.status !== 200) {
  //    sendNotification(response, "global", "error")
  //    return {
  //      props: { data: staticGlobal, sceneData: staticScene },
  //      revalidate: day,
  //    }
  //  }
  //  return {
  //    props: { data, sceneData },
  //    revalidate: day,
  //  }
  //  // use static data
  //} else {
  //  const data = staticGlobal
  //  const sceneData = staticScene
  //  return {
  //    props: { data, sceneData },
  //    revalidate: day,
  //  }
  //}
}

const Scenes = (props) => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  //const result = props.data
  //const sceneResult = props.sceneData
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
