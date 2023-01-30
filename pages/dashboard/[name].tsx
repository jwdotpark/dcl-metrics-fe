/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import Layout from "../../src/components/layout/layout"
import Scene from "../../src/components/local/stats/Scene"
import { getDataWithProxy } from "../../src/lib/data/fetch"
import { findUUID, sceneID } from "../../src/lib/data/sceneID"
import moment from "moment"
import { getEndpoint } from "../../src/lib/data/constant"
import { useRouter } from "next/router"

export async function getServerSideProps(context) {
  const { name } = context.query
  const uuid = findUUID(name)

  //const historyUrl = `https://dcl-metrics-be-staging.herokuapp.com/scenes/${uuid}/history`
  const historyUrl = getEndpoint(`scenes/${uuid}/history`)
  const historyResult = await getDataWithProxy(historyUrl, historyUrl, {})

  const sceneUrl = getEndpoint(`scenes/${uuid}`)
  const sceneResult = await getDataWithProxy(sceneUrl, sceneUrl, {})

  return {
    props: { historyResult, sceneResult, uuid },
  }
}

const DashboardPage = ({ historyResult, sceneResult, uuid }) => {
  const router = useRouter()
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

  useEffect(() => {
    const name = router.query.name
    const authID = sceneID[localStorage.getItem("account")].name
    if (name !== authID) {
      router.push("/dashboard/")
    } else {
    }
  }, [])

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
