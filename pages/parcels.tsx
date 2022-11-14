import { useBreakpointValue, Grid, useColorModeValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import staticGlobal from "../public/data/cached_global_response.json"
import { useAtom } from "jotai"
import { DataAtom, LoadingStateAtom } from "../src/lib/hooks/atoms"

import AFKTimeSpentParcel from "../src/components/local/stats/parcels/AFKTimeSpentParcel"
import AvgTimeSpentParcel from "../src/components/local/stats/parcels/AvgTimeSpentParcel"
import LogInTimeSpentParcel from "../src/components/local/stats/parcels/LogInTimeSpentParcel"
import LogOutTimeSpentParcel from "../src/components/local/stats/parcels/LogOutTimeSpentParcel"
import MostVisitedParcel from "../src/components/local/stats/parcels/MostVisitedParcel"
import { sendNotification } from "../src/lib/hooks/sendNotification"
const axios = require("axios").default
import fs from "fs"

export async function getStaticProps() {
  const day = 60 * 60 * 24
  const isProd = process.env.NEXT_PUBLIC_STAGING === "false"

  const url = isProd
    ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "global"
    : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "global"

  // TODO refactor point
  if (process.env.NEXT_PUBLIC_STAGING === "false") {
    const response = await axios
      .get(url, {
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
      .catch((error) => {
        console.log(error)
        return { props: { data: staticGlobal }, revalidate: day }
      })

    if (response.status !== 200) {
      sendNotification(response, "global", "error")
    }

    const data = response.data
    return {
      props: { data },
      revalidate: day,
    }

    // staging endpoint
  } else if (
    process.env.NEXT_PUBLIC_STAGING === "true" &&
    process.env.LOCAL !== "true"
  ) {
    const response = await fetch(url)
    const data = await response.json()

    if (response.status !== 200) {
      sendNotification(response, "global", "error")
      return {
        props: { data: staticGlobal },
        revalidate: day,
      }
    }
    return {
      props: { data },
      revalidate: day,
    }
    // use static data
  } else {
    const data = staticGlobal
    return {
      props: { data },
      revalidate: day,
    }
  }
}

const Parcels = (props) => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const [isDataLoading] = useAtom(LoadingStateAtom)
  const result = props.data

  return (
    <Layout>
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
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

export default Parcels
