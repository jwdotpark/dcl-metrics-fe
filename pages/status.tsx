import { Box } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import StatusBox from "../src/components/local/status/StatusBox"
import { isDev, isLocal, isProd, statusURL } from "../src/lib/data/constant"
import { getData, getDataWithApiKey, writeFile } from "../src/lib/data/fetch"
import staticPeerStatus from "../public/data/staticPeerStatus.json"
import { generateMetaData, siteUrl } from "../src/lib/data/metadata"
import Head from "next/head"

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
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.image} />
      </Head>
      <Box>
        <StatusBox data={statusRes} />
      </Box>
    </Layout>
  )
}

export default Status
