import { Box } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import StatusBox from "../src/components/local/status/StatusBox"
import { isDev, isLocal, isProd, statusURL } from "../src/lib/data/constant"
import { getData, getDataWithApiKey, writeFile } from "../src/lib/data/fetch"
import staticPeerStatus from "../public/data/staticPeerStatus.json"
import { generateMetaData, siteUrl } from "../src/lib/data/metadata"
import { NextSeo } from "next-seo"

export async function getStaticProps() {
  if (isProd) {
    const statusRes = await getDataWithApiKey(
      statusURL,
      "/peer_status",
      staticPeerStatus
    )

    writeFile("staticPeerStatus", statusRes)

    const result = { statusRes }
    return {
      props: result,
    }
  } else if (isDev && !isLocal) {
    const statusRes = await getData(statusURL, "/peer_status", staticPeerStatus)
    const result = { statusRes }
    return {
      props: result,
    }
  } else if (isLocal) {
    const statusRes = staticPeerStatus
    const result = { statusRes }
    return {
      props: result,
    }
  }
}

const Status = (props: Props) => {
  const { statusRes } = props

  const pageTitle = "DCL-Metrics Status"
  const description =
    "Resource for monitoring and updates on the status of DCL-Metrics infrastructure."
  const image = `${siteUrl}/images/status.png`

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
          url: siteUrl + "/status",
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

      <Box>
        <StatusBox data={statusRes} />
      </Box>
    </Layout>
  )
}

export default Status
