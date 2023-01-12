import { useState } from "react"
import type { NextPage } from "next"
import { Grid, useBreakpointValue, Accordion, Box } from "@chakra-ui/react"
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
import { time, isProd, isDev, isLocal } from "../src/lib/data/constant"
import { globalRequestList, globalFileNameArr } from "../src/lib/data/fetchList"

export async function getStaticProps() {
  if (isProd) {
    const [
      globalDailyRes,
      globalParcelRes,
      globalSceneRes,
      globalUserRes,
      sceneRes,
      parcelRes,
    ] = await Promise.all(
      globalRequestList.map(({ url, endpoint, staticData }) =>
        getDataWithProxy(url, endpoint, staticData)
      )
    )

    const resultArr = [
      globalDailyRes,
      globalParcelRes,
      globalSceneRes,
      globalUserRes,
      sceneRes,
      parcelRes,
    ]

    for (let i = 0; i < globalFileNameArr.length; i++) {
      writeFile(globalFileNameArr[i], resultArr[i])
    }

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
    const [
      globalDailyRes,
      globalParcelRes,
      globalSceneRes,
      globalUserRes,
      sceneRes,
      parcelRes,
    ] = await Promise.all(
      globalRequestList.map(({ url, endpoint, staticData }) =>
        getData(url, endpoint, staticData)
      )
    )

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
  } else if (isLocal) {
    const globalDailyRes = staticGlobalDaily
    const globalParcelRes = staticGlobalParcels
    const globalSceneRes = staticGlobalScenes
    const globalUserRes = staticGlobalUsers
    const sceneRes = staticScene
    const parcelRes = staticParcel

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
  }
}

const GlobalPage: NextPage = (props: Props) => {
  const gridColumn = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 2,
  })

  const [isPSAVisible, setIsPSAVisible] = useState(true)

  const {
    globalDailyRes,
    globalParcelRes,
    globalSceneRes,
    globalUserRes,
    sceneRes,
    parcelRes,
  } = props

  return (
    <Layout>
      <Box w="100%">
        {isPSAVisible && <PSA setIsPSAVisible={setIsPSAVisible} />}
        <Box mb="4">
          <UniqueVisitors data={globalDailyRes} />
        </Box>

        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <UniqueVisitedParcels data={globalDailyRes} />
          <ActiveScenes data={globalDailyRes} />
        </Grid>

        <LandPicker parcelData={parcelRes} isPage={false} />

        <Accordion mx={[-4, 0]} allowMultiple defaultIndex={[0, 1, 2]}>
          <UserLayout result={globalUserRes} />
          <SceneLayout result={globalSceneRes} sceneResult={sceneRes} />
          <ParcelLayout result={globalParcelRes} />
        </Accordion>
      </Box>
    </Layout>
  )
}

export default GlobalPage
