import { useEffect, useState } from "react"
import type { NextPage } from "next"
import {
  Grid,
  useBreakpointValue,
  Accordion,
  Box,
  Button,
} from "@chakra-ui/react"
import staticGlobal from "../public/data/cached_global_response.json"
import staticScene from "../public/data/cached_scenes_top.json"
import { useAtom } from "jotai"
import { DataAtom, SceneDataAtom } from "../src/lib/hooks/atoms"
const axios = require("axios").default
import fs from "fs"
import { sendNotification } from "../src/lib/hooks/sendNotification"
import Layout from "../src/components/layout/layout"
import UserLayout from "../src/components/layout/global/UserLayout"
import SceneLayout from "../src/components/layout/global/SceneLayout"
import ParcelLayout from "../src/components/layout/global/ParcelLayout"
import UniqueVisitedParcels from "../src/components/local/stats/UniqueVisitedParcels"
import UniqueVisitors from "../src/components/local/stats/UniqueVisitors"
import ActiveScenes from "../src/components/local/stats/ActiveScenes"

export async function getStaticProps() {
  const day = 60 * 60 * 24
  if (process.env.NEXT_PUBLIC_ENV === "prod") {
    // global endpoint
    const url =
      process.env.NEXT_PUBLIC_STAGING !== "true"
        ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "global"
        : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "global"
    const response = await axios.get(url, {
      method: "get",
      proxy: {
        protocol: "http",
        host: process.env.FIXIE_HOST,
        port: 80,
        auth: {
          username: "fixie",
          password: process.env.FIXIE_TOKEN,
        },
      },
    })
    if (response.status === 200) {
      fs.writeFileSync(
        "./public/data/cached_global_response.json",
        JSON.stringify(response.data)
      )
    } else {
      const name = "global"
      sendNotification(response, name)
    }

    // /scenes/top
    const sceneURL =
      process.env.NEXT_PUBLIC_STAGING !== "true"
        ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "scenes/top"
        : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "scenes/top"
    const sceneResponse = await axios.get(sceneURL, {
      method: "get",
      proxy: {
        protocol: "http",
        host: process.env.FIXIE_HOST,
        port: 80,
        auth: {
          username: "fixie",
          password: process.env.FIXIE_TOKEN,
        },
      },
    })
    if (sceneResponse.status === 200) {
      fs.writeFileSync(
        "./public/data/cached_scenes_top.json",
        JSON.stringify(sceneResponse.data)
      )
    } else {
      const name = "scenes/top"
      sendNotification(sceneResponse, name)
    }

    const data = response.data
    const sceneData = sceneResponse.data
    return {
      props: { data, sceneData },
      revalidate: day,
    }
  } else {
    const data = staticGlobal
    const sceneData = staticScene
    return {
      props: { data, sceneData },
      revalidate: day,
    }
  }
}

const GlobalPage: NextPage = (props) => {
  const [isDataLoading, setIsDataLoading] = useState(false)

  const gridColumn = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 2,
  })

  // @ts-ignore
  const result = props.data
  // @ts-ignore
  const sceneResult = props.sceneData
  const [res, setRes] = useAtom(DataAtom)
  const [sceneRes, setSceneRes] = useAtom(SceneDataAtom)

  useEffect(() => {
    setRes(result)
    setSceneRes(sceneResult)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <Box w="100%">
        <Box mb="4">
          <UniqueVisitors data={result.global} visitorLoading={isDataLoading} />
        </Box>

        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <UniqueVisitedParcels
            data={result.global}
            visitorLoading={isDataLoading}
          />
          <ActiveScenes data={result.global} visitorLoading={isDataLoading} />
        </Grid>

        <Accordion allowMultiple defaultIndex={[0, 1, 2]}>
          <UserLayout result={result} isDataLoading={isDataLoading} />
          <SceneLayout
            result={result}
            sceneResult={sceneResult}
            isDataLoading={isDataLoading}
          />
          <ParcelLayout result={result} isDataLoading={isDataLoading} />
        </Accordion>
      </Box>
    </Layout>
  )
}

export default GlobalPage
