import Layout from "../../src/components/layout/layout"
import { useRouter } from "next/router"
import { isProd } from "../../src/lib/data/constant"

const SingleScenePage = ({ data }) => {
  //const router = useRouter()
  return <Layout>{JSON.stringify(data)}</Layout>
}

export default SingleScenePage

export async function getServerSideProps(context) {
  const cid = context.query.cid
  //const url = isProd
  //  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT
  //  : process.env.NEXT_PUBLIC_DEV_ENDPOINT
  const url = process.env.NEXT_PUBLIC_PROD_ENDPOINT
  const path = "scenes/" + cid
  const endPoint = url + path
  console.log(endPoint)

  const res = await fetch(endPoint)
  const data = await res.json()

  return {
    props: { data },
  }
}
