/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import type { NextPage } from "next"
import {
  Grid,
  useBreakpointValue,
  Box,
  Spinner,
  Center,
} from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import LandPicker from "../src/components/global/map/LandPicker"
import UniqueVisitedParcels from "../src/components/local/stats/UniqueVisitedParcels"
//import UniqueVisitors from "../src/components/local/stats/UniqueVisitors"
import ActiveScenes from "../src/components/local/stats/ActiveScenes"
//import LandSales from "../src/components/local/stats/rentals/LandSales"
import OnlineUsers from "../src/components/local/ext-data/OnlineUsers"
import {
  fetchGlobalData,
  //fetchRentalData,
  getLatestPost,
} from "../src/lib/data/fetch"
//import RentalDay from "../src/components/local/stats/rentals/RentalDay"
//import RentalTotal from "../src/components/local/stats/rentals/RentalTotal"
import ActiveUsers from "../src/components/local/ext-data/ActiveUsers"
import { generateMetaData, siteUrl } from "../src/lib/data/metadata"
import { NextSeo } from "next-seo"
import WorldStat from "../src/components/local/stats/world/WorldStat"
import WorldCurrentTop from "../src/components/local/stats/world/WorldCurrentTop"
import { isLocal } from "../src/lib/data/constant"
import staticWorldCurrent from "../public/data/staticWorldCurrent.json"
import BoxWrapper from "../src/components/layout/local/BoxWrapper"
import UniqueVisitor from "../src/components/local/stats/UniqueVisitor"
import { DataArrayType, DataObjectType } from "../src/lib/types/IndexPage"

export async function getStaticProps() {
  const globalData = await fetchGlobalData()
  //const rentalData = await fetchRentalData()
  const latestPost = getLatestPost()
  return {
    props: {
      ...globalData,
      //rental: rentalData,
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
    //landSalesRes, rental
  } = props

  const pageTitle = "DCL-Metrics"
  const description =
    "We make Decentraland's data accessible so it can be used by the community to build a better metaverse."
  const image = `${siteUrl}/images/index.png`

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  const [worldData, setWorldData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const fetchWorldData = async () => {
    const baseUrl = "http://api.dcl-metrics.com/"
    const endpoint = "worlds/current"

    setIsLoading(true)
    try {
      if (!isLocal) {
        const response = await fetch(`/api/fetch?url=${baseUrl + endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        const data = await response.json()
        setWorldData(data.result)
      } else {
        setWorldData(staticWorldCurrent)
      }
    } catch (error) {
      console.error("Error fetching world data..")
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const flattenObject = (
    temp: Record<string, DataObjectType>
  ): DataArrayType[] => {
    return Object.entries(temp).map(([date, value]) => ({
      date,
      active_parcels: value.active_parcels,
      active_scenes: value.active_scenes,
      guest_users: value.users.guest_users,
      named_users: value.users.named_users,
      new_users: value.users.new_users,
      unique_users: value.users.unique_users,
      degraded: value.degraded,
    }))
  }

  const chartData = flattenObject(globalDailyRes)

  useEffect(() => {
    fetchWorldData()
  }, [])

  return (
    <>
      <NextSeo
        title={metaData.title}
        description={metaData.description}
        openGraph={{
          url: siteUrl,
          title: metaData.title,
          description: metaData.description,
          images: [
            {
              url: metaData.image,
              width: 400,
              height: 400,
              alt: metaData.description,
              type: "image/png",
            },
          ],
          siteName: "DCL-Metrics",
        }}
      />
      <Layout>
        <Box w="100%">
          <Box mb="4" data-testid="uniqueVisitors">
            {/*<UniqueVisitors data={globalDailyRes} />*/}
            {/*<Box mb="4" />*/}
            <UniqueVisitor chartData={chartData} />
          </Box>
          <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
            <UniqueVisitedParcels data={globalDailyRes} />
            <ActiveScenes data={globalDailyRes} />
          </Grid>
          <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
            <OnlineUsers />
            <ActiveUsers />
          </Grid>
          <LandPicker parcelData={parcelRes} isPage={false} parcelCoord={{}} />
          {!isLoading && !error && Object.keys(worldData).length > 0 ? (
            <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
              <WorldStat worldCurrentRes={worldData} isMainPage={true} />
              <WorldCurrentTop worldCurrentRes={worldData} pageSize={4} />
            </Grid>
          ) : (
            <>
              <BoxWrapper colSpan={[1, 1, 1, 2, 6]}>
                <Center h="500px">
                  <Spinner />
                </Center>
              </BoxWrapper>
              <Box mb="4" />
            </>
          )}
          {/*<Box mb="4">
            <LandSales data={landSalesRes} />
          </Box>
          <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
            <RentalDay data={rental} />
            <RentalTotal data={rental} />
          </Grid>*/}
        </Box>
      </Layout>
    </>
  )
}

export default GlobalPage
