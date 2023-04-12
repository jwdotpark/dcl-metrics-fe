import Layout from "../../src/components/layout/layout"
import { getDataWithProxy, getData, writeFile } from "../../src/lib/data/fetch"
import { isProd, isDev, isLocal } from "../../src/lib/data/constant"
import staticUserAddress from "../../public/data/staticUserAddress.json"
import { Grid, useBreakpointValue } from "@chakra-ui/react"
import UserProfile from "../../src/components/local/stats/user/UserProfile"
import UserInfo from "../../src/components/local/stats/user/UserInfo"

export async function getServerSideProps(context) {
  const { address } = context.query
  const addressUrl = `https://api.dcl-metrics.com/users/${address}`
  const nftsUrl = `https://api.dcl-metrics.com/users/${address}/nfts`
  const daoActivityUrl = `https://api.dcl-metrics.com/users/${address}/dao_activity`

  let userAddressRes

  if (isProd) {
    userAddressRes = getDataWithProxy(addressUrl, "users/" + address, {})
    //const nftsResult = getDataWithProxy(
    //  nftsUrl,
    //  "users/" + address + "/nfts",
    //  {}
    //)
    //const daoActivityResult = getDataWithProxy(
    //  daoActivityUrl,
    //  "users/" + address + "/dao_activity",
    //  {}
    //)
  } else if (isDev && !isLocal) {
    userAddressRes = getData(addressUrl, "users/" + address, {})
  } else if (isLocal) {
    userAddressRes = staticUserAddress
  }

  return {
    props: { address, userAddressRes },
  }
}

const SingleUserPage = (props) => {
  const gridColumn = useBreakpointValue({ base: 1, sm: 1, md: 1, lg: 4, xl: 6 })
  const { userAddressRes } = props

  return (
    <Layout>
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
        <UserProfile data={userAddressRes} />
        <UserInfo data={userAddressRes} />
      </Grid>
    </Layout>
  )
}

export default SingleUserPage
