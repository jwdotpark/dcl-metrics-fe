/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../src/components/layout/layout"
import { getDataWithApiKey } from "../../src/lib/data/fetch"
import { isProd, isDev, isLocal } from "../../src/lib/data/constant"
import staticUserAddress from "../../public/data/staticUserAddress.json"
import staticUserNFT from "../../public/data/staticUserNFT.json"
import staticUserDAOActivity from "../../public/data/staticUserDAOActivity.json"
import {
  Text,
  Box,
  Center,
  Grid,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react"
import UserProfile from "../../src/components/local/stats/user/UserProfile"
import UserInfo from "../../src/components/local/stats/user/UserInfo"
import UserNFT from "../../src/components/local/stats/user/UserNFT"
import UserDAOActivity from "../../src/components/local/stats/user/UserDAOActivity"
import UserTimeSpent from "../../src/components/local/stats/user/UserTimeSpent"
import UserScenesVisited from "../../src/components/local/stats/user/UserScenesVisited"
import UserTopScenes from "../../src/components/local/stats/user/UserTopScenes"
import { generateMetaData, siteUrl } from "../../src/lib/data/metadata"
import { NextSeo } from "next-seo"

export async function getServerSideProps(context) {
  const { address } = context.query

  let userAddressRes, nftRes, daoActivityRes

  const addressUrl = `https://api.dcl-metrics.com/users/${address}`
  const nftsUrl = `https://api.dcl-metrics.com/users/${address}/nfts`
  const daoActivityUrl = `https://api.dcl-metrics.com/users/${address}/dao_activity`

  if (isProd) {
    userAddressRes = await getDataWithApiKey(addressUrl, "users/" + address, {})
    nftRes = await getDataWithApiKey(nftsUrl, "users/" + address + "/nfts", {})
    daoActivityRes = await getDataWithApiKey(
      daoActivityUrl,
      "users/" + address + "/dao_activity",
      {}
    )
  } else if (isDev && !isLocal) {
    userAddressRes = await getDataWithApiKey(addressUrl, "users/" + address, {})
    nftRes = await getDataWithApiKey(nftsUrl, "users/" + address + "/nfts", {})
    daoActivityRes = await getDataWithApiKey(
      daoActivityUrl,
      "users/" + address + "/dao_activity",
      {}
    )
  } else if (isLocal) {
    userAddressRes = staticUserAddress
    nftRes = staticUserNFT
    daoActivityRes = staticUserDAOActivity
  }

  return {
    props: {
      address,
      userAddressRes,
      nftRes,
      daoActivityRes,
    },
  }
}

const SingleUserPage = (props) => {
  const gridColumn = useBreakpointValue({
    base: 1,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 4,
    xl: 6,
  })
  const { address, userAddressRes, nftRes, daoActivityRes } = props

  console.log(userAddressRes)

  const pageTitle = `DCL-Metrics ${userAddressRes.name}`
  const description = `${userAddressRes.name} last seen on ${userAddressRes.last_seen}}`
  const image = userAddressRes.avatar_url

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
          url: siteUrl + "/users/" + address,
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

      {Object.keys(userAddressRes).length === 0 ? (
        <Center h="calc(100vh - 8rem)">
          <Flex direction="column" w="100%">
            <Center mb="8">
              <Text fontSize={["3xl", "6xl"]} fontWeight="bold">
                User Not Found
              </Text>
            </Center>
            <Center w="100%" px={[0, 20]} fontSize={["xs", "md"]}>
              <Flex direction="column">
                <Center w="100%">
                  <Text>
                    User <kbd>{address}</kbd> is not in our system yet.
                  </Text>
                </Center>
                <Center>
                  <Text>
                    This usually means that they have never logged into
                    Decentraland client. If you think this is an error, please
                    contact us using <b>feedback menu</b> on the top.
                  </Text>
                </Center>
              </Flex>
            </Center>
          </Flex>
        </Center>
      ) : (
        <Box fontSize={["md", "md"]}>
          <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
            <UserProfile data={userAddressRes} />
          </Grid>
          <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
            <UserInfo data={userAddressRes} />
            <UserNFT data={nftRes} address={address} />
            <UserDAOActivity data={daoActivityRes} />
          </Grid>
          <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
            <UserTimeSpent address={address} userAddressRes={userAddressRes} />
            <UserScenesVisited
              address={address}
              userAddressRes={userAddressRes}
            />
          </Grid>
          <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
            <UserTopScenes address={address} userAddressRes={userAddressRes} />
          </Grid>
        </Box>
      )}
    </Layout>
  )
}

export default SingleUserPage
