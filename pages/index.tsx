import { useState } from "react"
import type { NextPage } from "next"
import { Grid, useBreakpointValue, Box } from "@chakra-ui/react"
import staticGlobalDaily from "../public/data/staticGlobalDaily.json"
import staticParcel from "../public/data/cached_parcel.json"
import staticLandSales from "../public/data/staticLandSales.json"
import staticMetaGameHubRes from "../public/data/staticMetaGameHub.json"
import Layout from "../src/components/layout/layout"
import PSA from "../src/components/global/PSA"
import LandPicker from "../src/components/global/map/LandPicker"
import UniqueVisitedParcels from "../src/components/local/stats/UniqueVisitedParcels"
import UniqueVisitors from "../src/components/local/stats/UniqueVisitors"
import ActiveScenes from "../src/components/local/stats/ActiveScenes"
import LandSales from "../src/components/local/stats/rentals/LandSales"
import OnlineUsers from "../src/components/local/ext-data/OnlineUsers"
import { writeFile, getDataWithProxy, getData } from "../src/lib/data/fetch"
import { time, isProd, isDev, isLocal } from "../src/lib/data/constant"
import { globalRequestList, globalFileNameArr } from "../src/lib/data/fetchList"
import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import RentalDay from "../src/components/local/stats/rentals/RentalDay"
import RentalTotal from "../src/components/local/stats/rentals/RentalTotal"
import { getPosts } from "../markdown/helpers/post"
import moment from "moment"
import ActiveUsers from "../src/components/local/ext-data/ActiveUsers"
import TopLand from "../src/components/local/ext-data/TopLand"

export async function getStaticProps() {
  let globalDailyRes, parcelRes, landSalesRes, metaGameHubRes

  if (isProd) {
    ;[globalDailyRes, parcelRes] = await Promise.all(
      globalRequestList.map(({ url, endpoint, staticData }) =>
        getDataWithProxy(url, endpoint, staticData)
      )
    )
    // not using fixie
    landSalesRes = await getDataWithProxy(
      "https://www.dcl-property.rentals/api/price_data",
      "https://www.dcl-property.rentals/api/price_data",
      staticLandSales
    )

    metaGameHubRes = await getDataWithProxy(
      "https://services.itrmachines.com/val-analytics/topSellingLands?metaverse=decentraland",
      "https://services.itrmachines.com/val-analytics/topSellingLands?metaverse=decentraland",
      staticMetaGameHubRes
    )
  } else if (isDev && !isLocal) {
    ;[globalDailyRes, parcelRes, landSalesRes, metaGameHubRes] =
      await Promise.all(
        globalRequestList.map(({ url, endpoint, staticData }) =>
          getData(url, endpoint, staticData)
        )
      )
  } else if (isLocal) {
    globalDailyRes = staticGlobalDaily
    parcelRes = staticParcel
    landSalesRes = staticLandSales
    metaGameHubRes = staticMetaGameHubRes
  }

  if (isProd) {
    for (let i = 0; i < globalFileNameArr.length; i++) {
      writeFile(
        globalFileNameArr[i],
        [globalDailyRes, parcelRes, landSalesRes, metaGameHubRes][i]
      )
    }
  }

  const rental = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/decentraland/rentals-ethereum-mainnet",
    cache: new InMemoryCache(),
  })

  const { data } = await rental.query({
    query: gql`
      query {
        analyticsTotalDatas {
          rentals
          volume
          lessorEarnings
          feeCollectorEarnings
        }
        analyticsDayDatas {
          date
          rentals
          volume
          lessorEarnings
          feeCollectorEarnings
        }
      }
    `,
  })

  // blog PSA
  const latestPost = getPosts().sort((a, b) => {
    return moment(b.data.date).unix() - moment(a.data.date).unix()
  })[0]

  return {
    props: {
      globalDailyRes,
      parcelRes,
      landSalesRes,
      metaGameHubRes,
      rental: data,
      latestPost: latestPost,
    },
    revalidate: time,
  }
}

const GlobalPage: NextPage = (props: Props) => {
  const gridColumn = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 6,
  })

  const [isPSAVisible, setIsPSAVisible] = useState(true)

  const {
    globalDailyRes,
    parcelRes,
    landSalesRes,
    metaGameHubRes,
    rental,
    latestPost,
  } = props

  return (
    <Layout>
      <Box w="100%">
        {isPSAVisible && (
          <PSA latestPost={latestPost} setIsPSAVisible={setIsPSAVisible} />
        )}
        <Box mb="4">
          <UniqueVisitors data={globalDailyRes} />
        </Box>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <UniqueVisitedParcels data={globalDailyRes} />
          <ActiveScenes data={globalDailyRes} />
        </Grid>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <OnlineUsers />
          <ActiveUsers />
        </Grid>
        <Box mb="4">
          <LandSales data={landSalesRes} />
        </Box>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <RentalDay data={rental} />
          <RentalTotal data={rental} />
        </Grid>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <TopLand data={metaGameHubRes} />
        </Grid>

        <LandPicker parcelData={parcelRes} isPage={false} />
      </Box>
    </Layout>
  )
}

export default GlobalPage
