/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment"
import { useEffect, useState } from "react"
import Layout from "../../src/components/layout/layout"
import Scene from "../../src/components/local/stats/Scene"
import { getEndpoint } from "../../src/lib/data/constant"
import { getDataWithApiKey } from "../../src/lib/data/fetch"
import { findUUID } from "../../src/lib/data/sceneID"

export async function getServerSideProps(context) {
  const { name } = context.query
  const uuid = findUUID(name)

  const historyUrl = getEndpoint(`scenes/${uuid}/visitor_history`)
  const historyResult = await getDataWithApiKey(historyUrl, historyUrl, {})

  const sceneUrl = getEndpoint(`scenes/${uuid}`)
  const sceneResult = await getDataWithApiKey(sceneUrl, sceneUrl, {})

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

  const targetDate = moment(date).format("YYYY-MM-DD")
  const path = `scenes/${uuid}?date=${targetDate}`
  const endpoint = getEndpoint(path)

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
      {uuid && (
        <Scene
          res={data}
          date={date}
          setDate={setDate}
          availableDate={availableDate}
          dailyUsers={historyResult}
          uuid={uuid}
        />
      )}
    </Layout>
  )
}

export default DashboardPage
