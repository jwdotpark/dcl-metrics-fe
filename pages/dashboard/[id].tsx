import Layout from "../../src/components/layout/layout"

import staticGlobal from "../../public/data/cached_global_response.json"
// import staticScene from "../../public/data/cached_scenes_top.json"
import staticScene from "../../public/data/private/private_scenes_top.json"

import { useRouter } from "next/router"
import { Box, Grid, Text, useBreakpointValue, Center } from "@chakra-ui/react"
import Scene from "../../src/components/local/stats/Scene"
import ScenesLogin from "../../src/components/local/stats/scenes/ScenesLogin"
import ScenesLogout from "../../src/components/local/stats/scenes/ScenesLogout"
import ScenesTimeSpent from "../../src/components/local/stats/scenes/ScenesTimeSpent"
import ScenesTimeSpentAFK from "../../src/components/local/stats/scenes/ScenesTimeSpentAFK"
import TopScenesVisitors from "../../src/components/local/stats/scenes/TopScenesVisitors"
import { useAtom } from "jotai"
import {
  DataAtom,
  LoadingStateAtom,
  SceneDataAtom,
  AuthAtom,
} from "../../src/lib/hooks/atoms"
import { useEffect, useState } from "react"
import { encrypt, decrypt } from "../../src/lib/hooks/utils"

const DashboardPage = () => {
  const router = useRouter()
  const { id } = router.query

  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })

  const [data] = useAtom(DataAtom)
  const [sceneData] = useAtom(SceneDataAtom)
  const [isDataLoading] = useAtom(LoadingStateAtom)
  const result = data.length !== 0 ? data : staticGlobal
  const sceneResult = sceneData.length !== 0 ? sceneData : staticScene
  // const [isAuthenticated, setIsAuthenticated] = useAtom(AuthAtom)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
          <Box w="100%" mb="4">
            <Center>
              <Text fontSize="3xl">{isLoggedIn && "Dashboard - " + id}</Text>
            </Center>
          </Box>
          <Scene res={sceneResult} />
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
