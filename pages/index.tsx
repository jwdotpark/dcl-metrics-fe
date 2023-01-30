import { useState } from "react"
import type { NextPage } from "next"
import { Grid, useBreakpointValue, Box } from "@chakra-ui/react"
import staticGlobalDaily from "../public/data/staticGlobalDaily.json"
import staticParcel from "../public/data/cached_parcel.json"
import staticLandSales from "../public/data/staticLandSales.json"
import Layout from "../src/components/layout/layout"
import PSA from "../src/components/global/PSA"
import LandPicker from "../src/components/global/map/LandPicker"
import UniqueVisitedParcels from "../src/components/local/stats/UniqueVisitedParcels"
import UniqueVisitors from "../src/components/local/stats/UniqueVisitors"
import ActiveScenes from "../src/components/local/stats/ActiveScenes"
import LandSales from "../src/components/local/stats/rentals/LandSales"
import Rental from "../src/components/local/stats/rentals/Rental"
import { writeFile, getDataWithProxy, getData } from "../src/lib/data/fetch"
import { time, isProd, isDev, isLocal } from "../src/lib/data/constant"
import { globalRequestList, globalFileNameArr } from "../src/lib/data/fetchList"
import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import RentalDay from "../src/components/local/stats/rentals/RentalDay"
import RentalTotal from "../src/components/local/stats/rentals/RentalTotal"

export async function getStaticProps() {
  let globalDailyRes, parcelRes, landSalesRes

  if (isProd) {
    ;[globalDailyRes, parcelRes] = await Promise.all(
      globalRequestList.map(({ url, endpoint, staticData }) =>
        getDataWithProxy(url, endpoint, staticData)
      )
    )
    // not using fixie
    landSalesRes = await getData(
      "https://www.dcl-property.rentals/api/price_data",
      "https://www.dcl-property.rentals/api/price_data",
      staticLandSales
    )
  } else if (isDev && !isLocal) {
    ;[globalDailyRes, parcelRes, landSalesRes] = await Promise.all(
      globalRequestList.map(({ url, endpoint, staticData }) =>
        getData(url, endpoint, staticData)
      )
    )
  } else if (isLocal) {
    globalDailyRes = staticGlobalDaily
    parcelRes = staticParcel
    landSalesRes = staticLandSales
  }

  if (isProd) {
    for (let i = 0; i < globalFileNameArr.length; i++) {
      writeFile(
        globalFileNameArr[i],
        [globalDailyRes, parcelRes, landSalesRes][i]
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

  return {
    props: {
      globalDailyRes,
      parcelRes,
      landSalesRes,
      rental: data,
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

  const [isPSAVisible, setIsPSAVisible] = useState(false)

  const { globalDailyRes, parcelRes, landSalesRes, rental } = props

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
        {/*<Box mb="4">
          <LandSales data={landSalesRes} />
        </Box>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <RentalDay data={rental} />
          <RentalTotal data={rental} />
        </Grid>*/}
        <LandPicker parcelData={parcelRes} isPage={false} />
      </Box>
    </Layout>
  )
}

export default GlobalPage
