import { useState } from "react"
import type { NextPage } from "next"
import { Grid, useBreakpointValue, Accordion, Box } from "@chakra-ui/react"
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
import { writeFile, getDataWithProxy, getData } from "../src/lib/data/fetch"
import { time, isProd, isDev, isLocal } from "../src/lib/data/constant"
import { globalRequestList, globalFileNameArr } from "../src/lib/data/fetchList"

//export async function getStaticProps() {
//  if (isProd) {
//    const [globalDailyRes, parcelRes] = await Promise.all(
//      globalRequestList.map(({ url, endpoint, staticData }) =>
//        getDataWithProxy(url, endpoint, staticData)
//      )
//    )

//    // land sales is not using fixie
//    const landSalesRes = await getData(
//      "https://www.dcl-property.rentals/api/price_data",
//      "https://www.dcl-property.rentals/api/price_data",
//      staticLandSales
//    )

//    const resultArr = [globalDailyRes, parcelRes, landSalesRes]

//    for (let i = 0; i < globalFileNameArr.length; i++) {
//      writeFile(globalFileNameArr[i], resultArr[i])
//    }

//    const result = {
//      globalDailyRes,
//      parcelRes,
//      landSalesRes,
//    }

//    return {
//      props: result,
//      revalidate: time,
//    }
//  } else if (isDev && !isLocal) {
//    const [globalDailyRes, parcelRes, landSalesRes] = await Promise.all(
//      globalRequestList.map(({ url, endpoint, staticData }) =>
//        getData(url, endpoint, staticData)
//      )
//    )

//    const result = {
//      globalDailyRes,
//      parcelRes,
//      landSalesRes,
//    }

//    return {
//      props: result,
//      revalidate: time,
//    }
//  } else if (isLocal) {
//    const globalDailyRes = staticGlobalDaily
//    const parcelRes = staticParcel
//    const landSalesRes = staticLandSales

//    const result = {
//      globalDailyRes,
//      parcelRes,
//      landSalesRes,
//    }

//    return {
//      props: result,
//      revalidate: time,
//    }
//  }
//}

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

  return {
    props: {
      globalDailyRes,
      parcelRes,
      landSalesRes,
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
    xl: 2,
  })

  const [isPSAVisible, setIsPSAVisible] = useState(true)

  const { globalDailyRes, parcelRes, landSalesRes } = props

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
        <Box mb="4">
          <LandSales data={landSalesRes} />
        </Box>
        <LandPicker parcelData={parcelRes} isPage={false} />
      </Box>
    </Layout>
  )
}

export default GlobalPage
