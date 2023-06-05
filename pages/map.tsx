import { Box } from "@chakra-ui/react"
import LandPicker from "../src/components/global/map/LandPicker"
import Layout from "../src/components/layout/layout"
import staticParcel from "../public/data/cached_parcel.json"
import { isDev, isLocal, isProd, parcelURL } from "../src/lib/data/constant"
import { getData, getDataWithApiKey, writeFile } from "../src/lib/data/fetch"
import { generateMetaData, siteUrl } from "../src/lib/data/metadata"
import { NextSeo } from "next-seo"

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
  const image = `${siteUrl}/images/map.png`

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  return (
    <Layout>
      <NextSeo
        title={metaData.title}
        description={metaData.description}
        openGraph={{
          url: siteUrl + "/map",
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

      <Box mb="4" mx={[-4, 0, 0, 0]}>
        <LandPicker parcelData={parcelRes} isPage={true} />
      </Box>
    </Layout>
  )
}

export default MapPage
