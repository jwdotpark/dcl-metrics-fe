/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import Layout from "../../src/components/layout/layout"
import Scene from "../../src/components/local/stats/Scene"
import { getDataWithProxy } from "../../src/lib/data/fetch"
import { findUUID } from "../../src/lib/data/sceneID"
import moment from "moment"

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
    props: { historyResult, sceneResult, uuid },
  }
}

const DashboardPage = ({ historyResult, sceneResult, uuid }) => {
  const availableDate = historyResult.map((item) => item.date)
  const [data, setData] = useState([sceneResult])
  const [date, setDate] = useState(
    new Date(availableDate[availableDate.length - 1])
  )

  // TODO sort by date on BE
  historyResult.sort((a, b) => {
    // @ts-ignore
    return new Date(a.date) - new Date(b.date)
  })

  const targetDate = moment(date).format("YYYY-MM-DD")
  const endpoint = `https://dcl-metrics-be-staging.herokuapp.com/scenes/${uuid}?date=${targetDate}`

  const fetchData = async () => {
    const result = await fetch(`/api/fetch?url=${endpoint}`)
    const data = await result.json()
    setData([data.result])
  }

  useEffect(() => {
    fetchData()
  }, [date])

  return (
    <Layout>
      <Scene
        res={data}
        date={date}
        setDate={setDate}
        availableDate={availableDate}
        dailyUsers={historyResult}
      />
    </Layout>
  )
}

export default DashboardPage
