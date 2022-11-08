// @ts-nocheck
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

const DashboardPage = () => {
  const router = useRouter()
  const { id } = router.query

  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })

  const [data] = useAtom(DataAtom)
  const [sceneData] = useAtom(SceneDataAtom)
  const [isDataLoading] = useAtom(LoadingStateAtom)
  const result = data.length !== 0 ? data : staticGlobal
  const sceneResult = sceneData.length !== 0 ? sceneData : staticScene
  const [isAuthenticated] = useAtom(AuthAtom)

  console.log(isAuthenticated)

  return (
    <Layout>
      {isAuthenticated ? (
        <>
          <Box w="100%" mb="4">
            <Center>
              <Text fontSize="3xl">{id}</Text>
            </Center>
          </Box>
          <Scene res={sceneResult} />
          {/* <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
        <TopScenesVisitors res={result.scenes} isSceneLoading={isDataLoading} />
        <ScenesTimeSpent res={result.scenes} isSceneLoading={isDataLoading} />
        <ScenesLogin res={result.scenes} isSceneLoading={isDataLoading} />
        <ScenesLogout res={result.scenes} isSceneLoading={isDataLoading} />
        <ScenesTimeSpentAFK
          res={result.scenes}
          isSceneLoading={isDataLoading}
        />
      </Grid> */}
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
