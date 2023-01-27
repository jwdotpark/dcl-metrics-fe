/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../../src/components/layout/layout"
import Scene from "../../src/components/local/stats/Scene"
import { getDataWithProxy } from "../../src/lib/data/fetch"
import { findUUID } from "../../src/lib/data/sceneID"

export async function getServerSideProps(context) {
  const { name } = context.query
  const uuid = findUUID(name)
  const historyUrl = `https://dcl-metrics-be-staging.herokuapp.com/scenes/${uuid}/history`
  const historyResult = await getDataWithProxy(historyUrl, historyUrl, {})

  const endPoint = process.env.NEXT_PUBLIC_PROD_ENDPOINT
  const path = "scenes/" + uuid
  const url = endPoint + path
  const sceneResult = await getDataWithProxy(url, path, {})
  return {
    props: { historyResult, sceneResult },
  }
}

const DashboardPage = ({ historyResult, sceneResult }) => {
  return (
    <Layout>
      <Scene
        res={[sceneResult]}
        date={""}
        setDate={""}
        availableDate={""}
        dailyUsers={historyResult}
      />
    </Layout>
  )
}

export default DashboardPage
