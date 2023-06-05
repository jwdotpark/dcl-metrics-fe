import { useBreakpointValue, Grid } from "@chakra-ui/react"
import Layout from "../../src/components/layout/layout"
import Explorer from "../../src/components/local/stats/Explorer"
import MarathonUsers from "../../src/components/local/stats/MarathonUsers"
import staticGlobalUsers from "../../public/data/staticGlobalUsers.json"
import { getDataWithApiKey, writeFile } from "../../src/lib/data/fetch"
import {
  isProd,
  isDev,
  isLocal,
  globalUsersURL,
} from "../../src/lib/data/constant"

export async function getStaticProps() {
  if (isProd) {
    const globalUserRes = await getDataWithApiKey(
      globalUsersURL,
      "/global/users",
      staticGlobalUsers
    )

    writeFile("staticGlobalUsers", globalUserRes)

    const result = { globalUserRes }
    return {
      props: result,
    }
  } else if (isDev && !isLocal) {
    const globalUserRes = await getDataWithApiKey(
      // FIXME temporary fetch to main BE
      process.env.NEXT_PUBLIC_PROD_ENDPOINT + "global/users",
      //globalUsersURL,
      "/global/users",
      staticGlobalUsers
    )

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
}

const Users = (props: Props) => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const { globalUserRes } = props

  return (
    <Layout>
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
        <MarathonUsers res={globalUserRes} />
        <Explorer res={globalUserRes} />
      </Grid>
    </Layout>
  )
}

export default Users
