import { useEffect, useState } from "react"
import type { NextPage } from "next"
import { Grid, useBreakpointValue, Accordion, Box } from "@chakra-ui/react"
import staticGlobal from "../public/data/cached_global_response.json"
import { useAtom } from "jotai"
import { DataAtom } from "../src/lib/hooks/atoms"

const axios = require("axios").default
import fs from "fs"

import Layout from "../src/components/layout/layout"
// import Scene from "../src/components/local/stats/Scene"
import UserLayout from "../src/components/layout/global/UserLayout"
import SceneLayout from "../src/components/layout/global/SceneLayout"
import ParcelLayout from "../src/components/layout/global/ParcelLayout"
import UniqueVisitedParcels from "../src/components/local/stats/UniqueVisitedParcels"
import UniqueVisitors from "../src/components/local/stats/UniqueVisitors"
import ActiveScenes from "../src/components/local/stats/ActiveScenes"

export async function getStaticProps() {
  const day = 60 * 60 * 24
  if (process.env.NEXT_PUBLIC_ENV === "prod") {
    // // production
    // const url = "http://api.dcl-metrics.com/global"
    const name = "/global"
    const url =
      process.env.NEXT_PUBLIC_ENV === "prod"
        ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + name
        : process.env.NEXT_PUBLIC_DEV_ENDPOINT + name
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
    }

    if (response.status !== 200) {
      const sendNotification = async () => {
        const URI =
          "https://dcl-metrics-bot-server.herokuapp.com/telegram/internal"
        const data = await fetch(URI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            level: "warning",
            message: `Global endpoint request is ${response.status} while FE is on build, check out the log`,
            payload: {
              status: response.status,
            },
          }),
        })
        await data.json()
      }
      sendNotification()

      // return {
      //   props: { staticGlobal },
      // }
    }
    const data = response.data
    return {
      props: { data },
      revalidate: day,
    }
  } else {
    const data = staticGlobal
    return {
      props: { data },
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
  const [res, setRes] = useAtom(DataAtom)

  useEffect(() => {
    setRes(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      {/* <Scene res={staticScene} /> */}
      {/* <TempError /> */}
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
          <SceneLayout result={result} isDataLoading={isDataLoading} />
          <ParcelLayout result={result} isDataLoading={isDataLoading} />
        </Accordion>
      </Box>
    </Layout>
  )
}

export default GlobalPage
