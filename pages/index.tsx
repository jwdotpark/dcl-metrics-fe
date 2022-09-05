import { useState } from "react"
import type { NextPage } from "next"
import { Grid, useBreakpointValue } from "@chakra-ui/react"
import staticGlobal from "../public/data/global_response.json"
const axios = require("axios").default

import Layout from "../src/components/layout/layout"
import UniqueVisitors from "../src/components/local/stats/UniqueVisitors"
import VisitedParcels from "../src/components/local/stats/UniqueVisitedParcels"
import MarathonUsers from "../src/components/local/stats/MarathonUsers"
import Explorer from "../src/components/local/stats/Explorer"
import AvgTimeSpentParcel from "../src/components/local/stats/AvgTimeSpentParcel"
import AFKTimeSpentParcel from "../src/components/local/stats/AFKTimeSpentParcel"
import LogOutTimeSpentParcel from "../src/components/local/stats/LogOutTimeSpentParcel"
import LogInTimeSpentParcel from "../src/components/local/stats/LogInTimeSpentParcel"
import MostVisitedParcel from "../src/components/local/stats/MostVisitedParcel"

import TempError from "../src/components/local/stats/error/TempError"

export async function getStaticProps() {
  const day = 60 * 60 * 24
  if (process.env.NEXT_PUBLIC_ENV === "prod") {
    // FIXME now it's using staging server res,
    // change to prod later

    // const url = "http://api.dcl-metrics.com/global"
    const url = "https://dcl-metrics-be-staging.herokuapp.com/global"
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
    const ISR = response.data
    return {
      props: { ISR },
      revalidate: day,
    }
  } else {
    const ISR = staticGlobal
    return {
      props: { ISR },
      revalidate: day,
    }
  }
}

const GlobalPage: NextPage = (ISR) => {
  const [isDataLoading, setIsDataLoading] = useState(false)

  // @ts-ignore
  const result = ISR.ISR

  const gridColumn = useBreakpointValue({
    md: 1,
    lg: 2,
    xl: 2,
  })

  return (
    <Layout>
      {/* <TempError /> */}
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <UniqueVisitors data={result.global} visitorLoading={isDataLoading} />
        <VisitedParcels data={result.global} visitorLoading={isDataLoading} />
        <MarathonUsers res={result.users} isLoading={isDataLoading} />
        <Explorer res={result.users} isLoading={isDataLoading} />
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
