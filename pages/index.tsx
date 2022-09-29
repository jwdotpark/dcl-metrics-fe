import { useState } from "react"
import type { NextPage } from "next"
import {
  Grid,
  useBreakpointValue,
  Button,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useColorModeValue,
} from "@chakra-ui/react"
import staticGlobal from "../public/data/cached_global_response.json"

const axios = require("axios").default
import fs from "fs"

import Layout from "../src/components/layout/layout"
import AccordionBox from "../src/components/local/stats/partials/AccordionBox"

import UniqueVisitors from "../src/components/local/stats/UniqueVisitors"
import VisitedParcels from "../src/components/local/stats/parcels/UniqueVisitedParcels"
import MarathonUsers from "../src/components/local/stats/MarathonUsers"
import Explorer from "../src/components/local/stats/Explorer"
import AvgTimeSpentParcel from "../src/components/local/stats/parcels/AvgTimeSpentParcel"
import AFKTimeSpentParcel from "../src/components/local/stats/parcels/AFKTimeSpentParcel"
import LogOutTimeSpentParcel from "../src/components/local/stats/parcels/LogOutTimeSpentParcel"
import LogInTimeSpentParcel from "../src/components/local/stats/parcels/LogInTimeSpentParcel"
import MostVisitedParcel from "../src/components/local/stats/parcels/MostVisitedParcel"

import TopScenesVisitors from "../src/components/local/stats/scenes/TopScenesVisitors"
import ScenesLogin from "../src/components/local/stats/scenes/ScenesLogin"
import ScenesLogout from "../src/components/local/stats/scenes/ScenesLogout"
import ScenesTimeSpent from "../src/components/local/stats/scenes/ScenesTimeSpent"
import ScenesTimeSpentAFK from "../src/components/local/stats/scenes/ScenesTimeSpentAFK"

import TempError from "../src/components/local/stats/error/TempError"

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
    // in any case req fails, use the cached data
    const data = staticGlobal
    return {
      props: { data },
    }
  }
}

const GlobalPage: NextPage = (props) => {
  // SSR suppressed loading state completely for now
  const [isDataLoading, setIsDataLoading] = useState(false)

  // @ts-ignore
  // const result = data.data
  const result = props.data

  const gridColumn = useBreakpointValue({
    md: 1,
    lg: 2,
    xl: 2,
  })

  return (
    <Layout>
      {/* <TempError /> */}
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4} mb="4">
        <UniqueVisitors data={result.global} visitorLoading={isDataLoading} />
        <VisitedParcels data={result.global} visitorLoading={isDataLoading} />
        <MarathonUsers res={result.users} isLoading={isDataLoading} />
        <Explorer res={result.users} isLoading={isDataLoading} />

        {/* scene */}
        <TopScenesVisitors res={result.scenes} isSceneLoading={isDataLoading} />
        <ScenesTimeSpent res={result.scenes} isSceneLoading={isDataLoading} />
        <ScenesLogin res={result.scenes} isSceneLoading={isDataLoading} />
        <ScenesLogout res={result.scenes} isSceneLoading={isDataLoading} />
        <ScenesTimeSpentAFK
          res={result.scenes}
          isSceneLoading={isDataLoading}
        />

        {/* parcel */}
        <AvgTimeSpentParcel
          parcel={result.parcels}
          isParcelLoading={isDataLoading}
        />
        <LogInTimeSpentParcel
          parcel={result.parcels}
          isParcelLoading={isDataLoading}
        />
        <AFKTimeSpentParcel
          parcel={result.parcels}
          isParcelLoading={isDataLoading}
        />
        <LogOutTimeSpentParcel
          parcel={result.parcels}
          isParcelLoading={isDataLoading}
        />
        <MostVisitedParcel
          parcel={result.parcels}
          isParcelLoading={isDataLoading}
        />
      </Grid>
    </Layout>
  )
}

export default GlobalPage
