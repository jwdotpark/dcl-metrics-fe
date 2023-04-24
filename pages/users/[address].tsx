import Layout from "../../src/components/layout/layout"
import { getDataWithApiKey } from "../../src/lib/data/fetch"
import { isProd, isDev, isLocal } from "../../src/lib/data/constant"
import staticUserAddress from "../../public/data/staticUserAddress.json"
import staticUserNFT from "../../public/data/staticUserNFT.json"
import staticUserDAOActivity from "../../public/data/staticUserDAOActivity.json"
import staticUserTimeSpent from "../../public/data/staticUserTimeSpent.json"
import staticUsercenesVisited from "../../public/data/staticUserScenesVisited.json"
import staticUserTopScenes from "../../public/data/staticUserTopScenes.json"

import {
  Text,
  Box,
  Center,
  Grid,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react"
import UserProfile from "../../src/components/local/stats/user/UserProfile"
import UserInfo from "../../src/components/local/stats/user/UserInfo"
import UserNFT from "../../src/components/local/stats/user/UserNFT"
import UserDAOActivity from "../../src/components/local/stats/user/UserDAOActivity"
import { FiAlertTriangle } from "react-icons/fi"
import UserTimeSpent from "../../src/components/local/stats/user/UserTimeSpent"
import UserScenesVisited from "../../src/components/local/stats/user/UserScenesVisited"

export async function getServerSideProps(context) {
  const { address } = context.query

  let userAddressRes, nftRes, daoActivityRes

  const addressUrl = `https://api.dcl-metrics.com/users/${address}`
  const nftsUrl = `https://api.dcl-metrics.com/users/${address}/nfts`
  const daoActivityUrl = `https://api.dcl-metrics.com/users/${address}/dao_activity`
  //const timeSpentUrl = `https://api.dcl-metrics.com/users/${address}/activity/time_spent`
  //const scenesVisitedUrl = `https://api.dcl-metrics.com/users/${address}/activity/scenes_visited`
  //const topScenesUrl = `https://api.dcl-metrics.com/users/${address}/activity/top_scenes`

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
  const gridColumn = useBreakpointValue({ base: 1, sm: 1, md: 1, lg: 4, xl: 6 })
  const { address, userAddressRes, nftRes, daoActivityRes } = props

  return (
    <Layout>
      {Object.keys(userAddressRes).length === 0 ? (
        <Center h="calc(100vh - 4rem)">
          <Text
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue("gray.600", "gray.200")}
          >
            <Box
              sx={{ transform: "translateY(3px)" }}
              display="inline-block"
              mr="2"
            >
              <FiAlertTriangle />
            </Box>
            No data for {address}
          </Text>
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
        </Box>
      )}
    </Layout>
  )
}

export default SingleUserPage
