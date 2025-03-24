/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react"
import type { NextPage } from "next"
import { Box } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import {
  fetchGlobalData,
  //fetchRentalData,
  //getLatestPost,
} from "../src/lib/data/fetch"
import staticWorldCurrent from "../public/data/staticWorldCurrent.json"
import { generateMetaData, siteUrl } from "../src/lib/data/metadata"
import { NextSeo } from "next-seo"
import { isLocal, isProd } from "../src/lib/data/constant"
import { flattenObject } from "../src/lib/hooks/utils"
import { GridContainer } from "../src/components/layout/global/grid/GridContainer"
//import LandPicker from "../src/components/global/map/LandPicker"
//import RentalDay from "../src/components/local/stats/rentals/RentalDay"
//import RentalTotal from "../src/components/local/stats/rentals/RentalTotal"
//import WorldStat from "../src/components/local/stats/world/WorldStat"
//import WorldCurrentTop from "../src/components/local/stats/world/WorldCurrentTop"
//import BoxWrapper from "../src/components/layout/local/BoxWrapper"
//import GlobalChart from "../src/components/local/stats/GlobalCharts"
//import { OnlineUsers } from "../src/components/local/stats/chart/OnlineUsers"
//import { ActiveUsers } from "../src/components/local/stats/chart/ActiveUsers"
//import GlobalUtilization from "../src/components/local/stats/chart/GlobalUtilization"

export async function getStaticProps() {
  const globalData = await fetchGlobalData()
  //const rentalData = await fetchRentalData()
  //const latestPost = getLatestPost()
  return {
    props: {
      ...globalData,
      //rental: rentalData,
      //latestPost: latestPost,
    },
  }
}

const GlobalPage: NextPage = (props: Props) => {
  const {
    globalDailyRes,
    parcelRes,
    //landSalesRes, rental,
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
  const [utilizationData, setUtilizationData] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const worldBaseUrl = "http://api.dcl-metrics.com/"
  const worldEndpoint = "worlds/current"
  const utilizationEndpoint = "utilization"

  const fetchWorldData = async () => {
    const response = await fetch(
      `/api/fetch?url=${worldBaseUrl + worldEndpoint}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    return response.json()
  }

  const fetchUtilizationData = async () => {
    const response = await fetch(
      `/api/fetch?url=${worldBaseUrl + utilizationEndpoint}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    return response.json()
  }

  const fetchClientData = async () => {
    setIsLoading(true)
    try {
      if (!isLocal) {
        const [worldData, utilizationData] = await Promise.all([
          fetchWorldData(),
          fetchUtilizationData(),
        ])

        setWorldData(worldData.result)
        setUtilizationData(
          Number(utilizationData.result.global_utilization.toFixed(2))
        )
      } else {
        const staticUtilizationData = 25
        setWorldData(staticWorldCurrent)
        setUtilizationData(staticUtilizationData)
      }
    } catch (error) {
      console.error("Error fetching data: ", error)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const chartData = flattenObject(globalDailyRes)

  useEffect(() => {
    fetchClientData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <GridContainer chartData={chartData} worldData={worldData} />
          {/*<Box mb="4" data-testid="uniqueVisitors">
            <GlobalChart chartData={chartData} />
            <Box mb="4" />
            <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
              <OnlineUsers />
              <ActiveUsers />
              <GlobalUtilization
                utilizationData={utilizationData}
                isLoading={isLoading}
              />
            </Grid>
          </Box>*/}
          {/*<LandPicker parcelData={parcelRes} isPage={false} parcelCoord={{}} />
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
          )}*/}
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
