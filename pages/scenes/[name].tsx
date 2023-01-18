import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react"
import Layout from "../../src/components/layout/layout"
import Scene from "../../src/components/local/stats/Scene"
import { useRouter } from "next/router"
const SingleScenePage = ({ data }) => {
  const router = useRouter()
  const res = [data]
  console.log(res)

  // @ts-ignore
  if (data.msg) {
    return (
      <Layout>
        <Center h="calc(100vh - 200px)">
          <Box>
            <Text fontSize="8xl">No data is available</Text>
          </Box>
        </Center>
      </Layout>
    )
  }

  return (
    <Layout>
      {res && (
        <Scene
          res={res}
          date=""
          setDate={{}}
          availableDate={[]}
          dailyUsers={{}}
        />
      )}
    </Layout>
  )
}

export default SingleScenePage

export async function getServerSideProps(context) {
  const cid = context.query.cid

  // TODO change url later
  //const endpoint = isProd
  //  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT
  //  : process.env.NEXT_PUBLIC_DEV_ENDPOINT

  const endPoint = process.env.NEXT_PUBLIC_PROD_ENDPOINT
  const path = "scenes/" + cid
  const url = endPoint + path

  const res = await fetch(url)
  const data = await res.json()
  
  return {
    props: { data },
  }
}
