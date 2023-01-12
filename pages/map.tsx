import { Box } from "@chakra-ui/react"
import LandPicker from "../src/components/global/map/LandPicker"
import Layout from "../src/components/layout/layout"
import staticParcel from "../public/data/cached_parcel.json"
const axios = require("axios").default
import { sendNotification } from "../src/lib/hooks/sendNotification"
import fs from "fs"
import {
  isDev,
  isLocal,
  isProd,
  parcelURL,
  time,
} from "../src/lib/data/constant"
import { getData, getDataWithProxy } from "../src/lib/data/fetch"

export async function getStaticProps() {
  if (isProd) {
    const parcelRes = await getDataWithProxy(
      parcelURL,
      "/parcels/all",
      staticParcel
    )
    const result = { parcelRes }
    return {
      props: result,
      revalidate: time,
    }
  } else if (isDev && !isLocal) {
    const parcelRes = await getData(parcelURL, "/parcels/all", staticParcel)
    const result = { parcelRes }
    return {
      props: result,
      revalidate: time,
    }
  } else if (isLocal) {
    const parcelRes = staticParcel
    const result = { parcelRes }
    return {
      props: result,
      revalidate: time,
    }
  }
  //const day = 60 * 60 * 24 * 365
  //const isProd = process.env.NEXT_PUBLIC_STAGING === "false"

  //const parcelUrl = isProd
  //  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "parcels/all"
  //  : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "parcels/all"

  //if (process.env.NEXT_PUBLIC_STAGING === "false") {
  //  const parcelResponse = await axios
  //    .get(parcelUrl, {
  //      method: "get",
  //      proxy: {
  //        protocol: "http",
  //        host: process.env.FIXIE_HOST,
  //        port: 80,
  //        auth: {
  //          username: "fixie",
  //          password: process.env.FIXIE_TOKEN,
  //        },
  //      },
  //    })
  //    .catch((error) => {
  //      console.log(error)
  //      return { props: { data: staticParcel }, revalidate: day }
  //    })

  //  if (parcelResponse.status === 200) {
  //    fs.writeFileSync(
  //      "./public/data/cached_parcel.json",
  //      JSON.stringify(parcelResponse.data)
  //    )
  //  } else if (parcelResponse.status !== 200) {
  //    sendNotification(parcelResponse, "parcels", "error")
  //  }

  //  const parcelData = parcelResponse.data
  //  return {
  //    props: { parcelData },
  //    revalidate: day,
  //  }

  //  // staging endpoint
  //} else if (
  //  process.env.NEXT_PUBLIC_STAGING === "true" &&
  //  process.env.LOCAL !== "true"
  //) {
  //  const parcelResponse = await fetch(parcelUrl)
  //  const parcelData = await parcelResponse.json()

  //  if (parcelResponse.status !== 200) {
  //    sendNotification(parcelResponse, "global", "error")
  //    return {
  //      props: {
  //        parcelData: staticParcel,
  //      },
  //      revalidate: day,
  //    }
  //  }
  //  return {
  //    props: { parcelData },
  //    revalidate: day,
  //  }
  //  // use static data
  //} else {
  //  const parcelData = staticParcel
  //  return {
  //    props: { parcelData },
  //    revalidate: day,
  //  }
  //}
}

const MapPage = (props) => {
  const { parcelRes } = props
  return (
    <Layout>
      <Box mb="4" mx={[-4, 0, 0, 0]}>
        <LandPicker parcelData={parcelRes} isPage={true} />
      </Box>
    </Layout>
  )
}

export default MapPage
