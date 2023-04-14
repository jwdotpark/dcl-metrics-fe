import Layout from "../../src/components/layout/layout"
import { getDataWithApiKey } from "../../src/lib/data/fetch"
import { isProd, isDev, isLocal } from "../../src/lib/data/constant"
import staticUserAddress from "../../public/data/staticUserAddress.json"
import staticUserNFT from "../../public/data/staticUserNFT.json"
import staticUserDAOActivity from "../../public/data/staticUserDAOActivity.json"
import { Box, Center, Grid, useBreakpointValue } from "@chakra-ui/react"
import UserProfile from "../../src/components/local/stats/user/UserProfile"
import UserInfo from "../../src/components/local/stats/user/UserInfo"
import UserNFT from "../../src/components/local/stats/user/UserNFT"
import UserDAOActivity from "../../src/components/local/stats/user/UserDAOActivity"
import { useEffect } from "react"

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
    //userAddressRes = staticUserAddress
    //nftRes = staticUserNFT
    //daoActivityRes = staticUserDAOActivity
    userAddressRes = await getDataWithApiKey(addressUrl, "users/" + address, {})
    nftRes = await getDataWithApiKey(nftsUrl, "users/" + address + "/nfts", {})
    daoActivityRes = await getDataWithApiKey(
      daoActivityUrl,
      "users/" + address + "/dao_activity",
      {}
    )
  }

  return {
    props: { userAddressRes, nftRes, daoActivityRes },
  }
}

const SingleUserPage = (props) => {
  const gridColumn = useBreakpointValue({ base: 1, sm: 1, md: 1, lg: 4, xl: 6 })
  const { userAddressRes, nftRes, daoActivityRes, isError } = props

  // TODO debugging data validity
  useEffect(() => {
    console.log("basic", userAddressRes)
    console.log("nft", nftRes)
    console.log("dao", daoActivityRes)
  }, [daoActivityRes, nftRes, userAddressRes])

  return (
    <Layout>
      <Box fontSize={["md", "md"]}>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <UserProfile data={userAddressRes} />
        </Grid>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <UserInfo data={userAddressRes} />
          <UserNFT data={nftRes} />
          <UserDAOActivity data={daoActivityRes} />
        </Grid>
      </Box>
    </Layout>
  )
}

export default SingleUserPage
