import { useBreakpointValue, Grid } from "@chakra-ui/react"
import Layout from "../../src/components/layout/layout"
import Explorer from "../../src/components/local/stats/Explorer"
import MarathonUsers from "../../src/components/local/stats/MarathonUsers"
import staticGlobalUsers from "../../public/data/staticGlobalUsers.json"
import { getDataWithApiKey } from "../../src/lib/data/fetch"
import {
  isProd,
  isDev,
  isLocal,
  globalUsersURL,
} from "../../src/lib/data/constant"
import { generateMetaData, siteUrl } from "../../src/lib/data/metadata"
import { NextSeo } from "next-seo"
import SearchUser from "../../src/components/local/stats/user/SearchUser"

export async function getStaticProps() {
  try {
    if (isProd) {
      //const globalUserRes = await getDataWithApiKey(
      //  globalUsersURL,
      //  "/global/users",
      //  staticGlobalUsers
      //)
      //const result = { globalUserRes }
      //return {
      //  props: result,
      //}
      const globalUserRes = staticGlobalUsers
      const result = { globalUserRes }
      return {
        props: result,
      }
    } else if (isDev && !isLocal) {
      //const globalUserRes = await getDataWithApiKey(
      //  process.env.NEXT_PUBLIC_PROD_ENDPOINT + "global/users",
      //  "/global/users",
      //  staticGlobalUsers
      //)
      //const result = { globalUserRes }
      //return {
      //  props: result,
      //}
      const globalUserRes = staticGlobalUsers
      const result = { globalUserRes }
      return {
        props: result,
      }
    } else if (isLocal) {
      const globalUserRes = staticGlobalUsers
      const result = { globalUserRes }
      return {
        props: result,
      }
    }
  } catch (err) {
    console.error("Error fetching global users:", err)
  } finally {
    return {
      props: { globalUserRes: staticGlobalUsers },
    }
  }

  //if (process.env.NEXT_PUBLIC_ALLOW_USER === "true") {
  //  if (isProd) {
  //    const globalUserRes = await getDataWithApiKey(
  //      globalUsersURL,
  //      "/global/users",
  //      staticGlobalUsers
  //    )
  //    const result = { globalUserRes }
  //    return {
  //      props: result,
  //    }
  //  } else if (isDev && !isLocal) {
  //    const globalUserRes = await getDataWithApiKey(
  //      process.env.NEXT_PUBLIC_PROD_ENDPOINT + "global/users",
  //      "/global/users",
  //      staticGlobalUsers
  //    )
  //    const result = { globalUserRes }
  //    return {
  //      props: result,
  //    }
  //  } else if (isLocal) {
  //    const globalUserRes = staticGlobalUsers
  //    const result = { globalUserRes }
  //    return {
  //      props: result,
  //    }
  //  }
  //} else {
  //  return {
  //    redirect: {
  //      destination: "/500",
  //      permanent: false,
  //    },
  //  }
  //}
}

const Users = (props: Props) => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const { globalUserRes } = props

  const pageTitle = "DCL-Metrics Users"
  const description =
    "Dive into a comprehensive analysis of user activity within the Decentraland metaverse. Explore valuable insights and metrics related to user engagement, behavior, and trends."
  const image = `${siteUrl}/images/users.png`

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
          url: siteUrl + "/users",
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
        {/*<Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <SearchUser />
        </Grid>*/}
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <MarathonUsers res={globalUserRes} />
          <Explorer res={globalUserRes} />
        </Grid>
      </Layout>
    </>
  )
}

export default Users
