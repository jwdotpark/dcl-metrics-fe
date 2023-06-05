import { Box } from "@chakra-ui/react"
import LandPicker from "../src/components/global/map/LandPicker"
import Layout from "../src/components/layout/layout"
import staticParcel from "../public/data/cached_parcel.json"
import { isDev, isLocal, isProd, parcelURL } from "../src/lib/data/constant"
import { getData, getDataWithApiKey, writeFile } from "../src/lib/data/fetch"
import { generateMetaData } from "../src/lib/data/metadata"
import Head from "next/head"

export async function getStaticProps() {
  if (isProd) {
    const parcelRes = await getDataWithApiKey(
      parcelURL,
      "/parcels/all",
      staticParcel
    )

    writeFile("staticParcel", parcelRes)

    const result = { parcelRes }
    return {
      props: result,
    }
  } else if (isDev && !isLocal) {
    const parcelRes = await getData(parcelURL, "/parcels/all", staticParcel)
    const result = { parcelRes }
    return {
      props: result,
    }
  } else if (isLocal) {
    const parcelRes = staticParcel
    const result = { parcelRes }
    return {
      props: result,
    }
  }
}

const MapPage = (props: Props) => {
  const { parcelRes } = props

  const pageTitle = "DCL-Metrics Map"
  const description =
    "Your interactive guide to exploring the virtual realm of Decentraland."
  const image = "/images/map.png"

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })
  
  return (
    <Layout>
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.image} />
      </Head>
      <Box mb="4" mx={[-4, 0, 0, 0]}>
        <LandPicker parcelData={parcelRes} isPage={true} />
      </Box>
    </Layout>
  )
}

export default MapPage
