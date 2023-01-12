import { useState } from "react"
import type { NextPage } from "next"
import { Grid, useBreakpointValue, Accordion, Box } from "@chakra-ui/react"
import staticGlobal from "../public/data/cached_global_response.json"

import staticGlobalDaily from "../public/data/staticGlobalDaily.json"
import staticGlobalParcels from "../public/data/staticGlobalParcel.json"
import staticGlobalScenes from "../public/data/staticGlobalScene.json"
import staticGlobalUsers from "../public/data/staticGlobalUsers.json"

import staticScene from "../public/data/cached_scenes_top.json"
import staticParcel from "../public/data/cached_parcel.json"
import Layout from "../src/components/layout/layout"
import PSA from "../src/components/global/PSA"
import LandPicker from "../src/components/global/map/LandPicker"
import UserLayout from "../src/components/layout/global/UserLayout"
import SceneLayout from "../src/components/layout/global/SceneLayout"
import ParcelLayout from "../src/components/layout/global/ParcelLayout"
import UniqueVisitedParcels from "../src/components/local/stats/UniqueVisitedParcels"
import UniqueVisitors from "../src/components/local/stats/UniqueVisitors"
import ActiveScenes from "../src/components/local/stats/ActiveScenes"
import { writeFile, getDataWithProxy, getData } from "../src/lib/data/fetch"
import {
  time,
  isProd,
  isDev,
  isLocal,
  url,
  globalDaily,
  globalParcel,
  globalScenes,
  globalUsers,
  sceneURL,
  parcelURL,
} from "../src/lib/data/constant"

export async function getStaticProps() {
  if (isProd) {
    //const globalRes = await getDataWithProxy(url, "/global", staticGlobal)
    const globalDailyRes = await getDataWithProxy(
      globalDaily,
      "/global/daily",
      staticGlobalDaily
    )

    const globalParcelRes = await getDataWithProxy(
      globalParcel,
      "/global/parcels",
      staticGlobalParcels
    )

    const globalSceneRes = await getDataWithProxy(
      globalScenes,
      "/global/scenes",
      staticGlobalScenes
    )

    const globalUserRes = await getDataWithProxy(
      globalUsers,
      "/global/users",
      staticGlobalUsers
    )

    const sceneRes = await getDataWithProxy(
      sceneURL,
      "/scenes/top",
      staticScene
    )
    const parcelRes = await getDataWithProxy(
      parcelURL,
      "/parcels/all",
      staticParcel
    )

    //writeFile("cached_global_response.json", globalDaily)
    writeFile("staticGlobalDaily.json", globalDailyRes)
    writeFile("staticGlobalParcels.json", globalParcelRes)
    writeFile("staticGlobalScenes.json", globalSceneRes)
    writeFile("staticGlobalUsers.json", globalUserRes)
    writeFile("cached_scene_top.json", sceneRes)
    writeFile("cached_parcel.json", parcelRes)

    const result = {
      globalDailyRes,
      globalParcelRes,
      globalSceneRes,
      globalUserRes,
      sceneRes,
      parcelRes,
    }
    
    return {
      props: result,
      revalidate: time,
    }
  } else if (isDev && !isLocal) {
    const globalRes = await getData(url, "/global", staticGlobal)
    const sceneRes = await getData(sceneURL, "/scenes/top", staticScene)
    const parcelRes = await getData(parcelURL, "/parcels/all", staticParcel)

    return {
      props: { globalRes, sceneRes, parcelRes },
      revalidate: time,
    }
  } else if (isLocal) {
    const globalRes = staticGlobal
    const sceneRes = staticScene
    const parcelRes = staticParcel
    return {
      props: { globalRes, sceneRes, parcelRes },
      revalidate: time,
    }
  }
}

const GlobalPage: NextPage = (props) => {
  const gridColumn = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 2,
  })

  const [isPSAVisible, setIsPSAVisible] = useState(true)
  // @ts-ignore
  const { globalRes, sceneRes, parcelRes } = props

  console.log(globalRes)

  return (
    <Layout>
      <Box w="100%">
        {isPSAVisible && <PSA setIsPSAVisible={setIsPSAVisible} />}
        <Box mb="4">
          <UniqueVisitors data={globalRes.global} />
        </Box>

        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <UniqueVisitedParcels data={globalRes.global} />
          <ActiveScenes data={globalRes.global} />
        </Grid>

        <LandPicker parcelData={parcelRes} isPage={false} />

        <Accordion mx={[-4, 0]} allowMultiple defaultIndex={[0, 1, 2]}>
          <UserLayout result={globalRes} />
          <SceneLayout result={globalRes} sceneResult={sceneRes} />
          <ParcelLayout result={globalRes} />
        </Accordion>
      </Box>
    </Layout>
  )
}

export default GlobalPage
