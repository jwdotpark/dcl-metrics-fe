import { Center } from "@chakra-ui/react"
import { NextSeo } from "next-seo"
import Layout from "../src/components/layout/layout"
import { generateMetaData, siteUrl } from "../src/lib/data/metadata"

const Custom500 = () => {
  const pageTitle = `DCL-Metrics - 500`
  const description = "description"
  const image = ""

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  return (
    <>
      <NextSeo
        title={metaData.title}
        description={metaData.description}
        openGraph={{
          url: siteUrl + "/events",
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
        }}
      />
      <Layout>
        <Center h="calc(100vh - 8rem)">
          We apologize for the inconvenience, but the page you are trying to
          access is temporarily unavailable.
        </Center>
      </Layout>
    </>
  )
}

export default Custom500
