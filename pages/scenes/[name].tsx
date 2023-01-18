import Layout from "../../src/components/layout/layout"
import { useRouter } from "next/router"
import { isProd } from "../../src/lib/data/constant"
import Scene from "../../src/components/local/stats/Scene"

const SingleScenePage = ({ data }) => {
  const res = [data]
  return (
    <Layout>
      <Scene
        res={res}
        date=""
        setDate={{}}
        availableDate={[]}
        dailyUsers={{}}
      />
    </Layout>
  )
}

export default SingleScenePage

export async function getServerSideProps(context) {
  const cid = context.query.cid

  // TODO change url later
  //const url = isProd
  //  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT
  //  : process.env.NEXT_PUBLIC_DEV_ENDPOINT

  const url = process.env.NEXT_PUBLIC_PROD_ENDPOINT
  const path = "scenes/" + cid
  const endPoint = url + path

  const res = await fetch(endPoint)
  const data = await res.json()

  return {
    props: { data },
  }
}
