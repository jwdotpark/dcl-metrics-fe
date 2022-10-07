import { useEffect, useState } from "react"
import type { NextPage } from "next"
import { Grid, useBreakpointValue, Accordion, Box } from "@chakra-ui/react"
import staticGlobal from "../public/data/cached_global_response.json"
import staticScene from "../public/data/top_scenes.json"
import { useAtom } from "jotai"
import { DataAtom } from "../src/lib/hooks/atoms"

const axios = require("axios").default
import fs from "fs"

import Layout from "../src/components/layout/layout"
import Scene from "../src/components/local/stats/Scene"
import UserLayout from "../src/components/layout/global/UserLayout"
import SceneLayout from "../src/components/layout/global/SceneLayout"
import ParcelLayout from "../src/components/layout/global/ParcelLayout"

export async function getStaticProps() {
  const day = 60 * 60 * 24
  if (process.env.NEXT_PUBLIC_ENV === "prod") {
    // temp staging
    // const url = "https://dcl-metrics-be-staging.herokuapp.com/global"
    // const response = await axios.get(url)

    // // production
    const url = "http://api.dcl-metrics.com/global"
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

    if (response.status >= 300) {
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
            message: `Global endpoint request failed on FE build, check out the logs in BE server`,
            payload: {
              status: response.status,
            },
          }),
        })
        await data.json()
      }
      sendNotification()

      return {
        props: { staticGlobal },
      }
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
