/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import type { NextPage } from "next"
import { Grid, useBreakpointValue, Box } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import LandPicker from "../src/components/global/map/LandPicker"
import UniqueVisitedParcels from "../src/components/local/stats/UniqueVisitedParcels"
import UniqueVisitors from "../src/components/local/stats/UniqueVisitors"
import ActiveScenes from "../src/components/local/stats/ActiveScenes"
import LandSales from "../src/components/local/stats/rentals/LandSales"
import OnlineUsers from "../src/components/local/ext-data/OnlineUsers"
import {
  fetchGlobalData,
  fetchRentalData,
  getLatestPost,
} from "../src/lib/data/fetch"
import RentalDay from "../src/components/local/stats/rentals/RentalDay"
import RentalTotal from "../src/components/local/stats/rentals/RentalTotal"
import ActiveUsers from "../src/components/local/ext-data/ActiveUsers"
import TopPick from "../src/components/local/ext-data/TopPick"
import { useAtom } from "jotai"
import { psaAtom } from "../src/lib/state/psaState"

export async function getStaticProps() {
  const globalData = await fetchGlobalData()
  const rentalData = await fetchRentalData()
  const latestPost = getLatestPost()

  return {
    props: {
      ...globalData,
      rental: rentalData,
      latestPost: latestPost,
    },
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

  const {
    globalDailyRes,
    parcelRes,
    landSalesRes,
    topLandRes,
    topPickRes,
    rental,
    latestPost,
  } = props

  const [psa, setPSA] = useAtom(psaAtom)

  useEffect(() => {
    setPSA(latestPost)
  }, [])

  return (
    <Layout>
      <Box w="100%">
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
        <LandPicker parcelData={parcelRes} isPage={false} />
        <Box mb="4">
          <LandSales data={landSalesRes} />
        </Box>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <RentalDay data={rental} />
          <RentalTotal data={rental} />
        </Grid>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <TopPick data={topPickRes} />
        </Grid>
      </Box>
    </Layout>
  )
}

export default GlobalPage
