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
import useSWR from "swr"
import UserNotFound from "../../src/components/local/user/UserNotFound"

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

  const pageTitle = `DCL-Metrics User ${userAddressRes.name} Dashboard`
  const description = `${userAddressRes.name}, last seen on ${userAddressRes.last_seen}`
  const image = userAddressRes.avatar_url

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  const fetcher = (url) => fetch(url).then((res) => res.json())

  const nameUrl = `https://peer.decentraland.org/lambdas/users/${address}/names`
  const wearableUrl = `https://peer.decentraland.org/lambdas/users/${address}/wearables`
  const landUrl = `https://peer.decentraland.org/lambdas/users/${address}/lands`
  const emoteUrl = `https://peer.decentraland.org/lambdas/users/${address}/emotes`

  const {
    data: names,
    error: nameError,
    isLoading: nameLoading,
  } = useSWR(nameUrl, fetcher)
  const {
    data: wearables,
    error: wearableError,
    isLoading: wearableLoading,
  } = useSWR(wearableUrl, fetcher)
  const {
    data: lands,
    error: landError,
    isLoading: landLoading,
  } = useSWR(landUrl, fetcher)
  const {
    data: emotes,
    error: emoteError,
    isLoading: emoteLoading,
  } = useSWR(emoteUrl, fetcher)

  return (
    <>
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
      <Layout>
        {Object.keys(userAddressRes).length === 0 ? (
          <UserNotFound address={address} />
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
              <UserTimeSpent
                address={address}
                userAddressRes={userAddressRes}
              />
              <UserScenesVisited
                address={address}
                userAddressRes={userAddressRes}
              />
            </Grid>
            <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
              <UserTopScenes
                address={address}
                userAddressRes={userAddressRes}
              />
            </Grid>
          </Box>
        )}
      </Layout>
    </>
  )
}

export default SingleUserPage
