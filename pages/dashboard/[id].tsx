import Layout from "../../src/components/layout/layout"

// import staticGlobal from "../../public/data/cached_global_response.json"
// import staticScene from "../../public/data/private/private_scenes_top.json"

import { useRouter } from "next/router"
import { Text, Center } from "@chakra-ui/react"
import Scene from "../../src/components/local/stats/Scene"
// import ScenesLogin from "../../src/components/local/stats/scenes/ScenesLogin"
// import ScenesLogout from "../../src/components/local/stats/scenes/ScenesLogout"
// import ScenesTimeSpent from "../../src/components/local/stats/scenes/ScenesTimeSpent"
// import ScenesTimeSpentAFK from "../../src/components/local/stats/scenes/ScenesTimeSpentAFK"
// import TopScenesVisitors from "../../src/components/local/stats/scenes/TopScenesVisitors"
import { useAtom } from "jotai"
import {
  DataAtom,
  LoadingStateAtom,
  SceneDataAtom,
} from "../../src/lib/hooks/atoms"
import { useEffect, useState } from "react"
import { decrypt } from "../../src/lib/hooks/utils"

export async function getServerSideProps(context) {
  const name = context.query.id
  const url = `https://dcl-metrics-be-staging.herokuapp.com/dashboard/${name}`
  const res = await fetch(url)
  const dashboard = await res.json()

  return {
    props: { dashboard, name },
  }
}

const DashboardPage = (props) => {
  // const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const router = useRouter()
  const { dashboard, name } = props
  const res = [dashboard.result]
  const availableDate = dashboard.available_dates

  const [data] = useAtom(DataAtom)
  const [sceneData] = useAtom(SceneDataAtom)
  const [isDataLoading] = useAtom(LoadingStateAtom)
  // const result = data.length !== 0 ? data : staticGlobal
  // const sceneResult = sceneData.length !== 0 ? sceneData : staticScene
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const d = new Date(availableDate[availableDate.length - 1])
  const [date, setDate] = useState(
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000)
  )

  useEffect(() => {
    // TODO fetch data with url through fixie proxy
    const target = new Date(date).toISOString().split("T")[0]
    const nextDay = new Date(target)
    nextDay.setDate(nextDay.getDate() + 1)
    const res = nextDay.toISOString().split("T")[0]
    const url = `https://dcl-metrics-be-staging.herokuapp.com/dashboard/${name}?date=${res}`
    console.log(url)

    // eslint-disable-next-line
  }, [date])

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const pathStr = window.location.pathname
    if (decrypt(auth) !== pathStr) {
      setIsLoggedIn(false)
      router.push("/dashboard")
    } else {
      setIsLoggedIn(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      {isLoggedIn ? (
        <>
          <Scene
            res={res}
            date={date}
            setDate={setDate}
            availableDate={availableDate}
          />
        </>
      ) : (
        <Center h="calc(100vh - 6rem)">
          <Text fontSize="3xl">You are not authenticated</Text>
        </Center>
      )}
    </Layout>
  )
}

export default DashboardPage
