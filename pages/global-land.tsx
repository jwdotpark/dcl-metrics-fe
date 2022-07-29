import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import type { NextPage } from "next"
import { Grid, useBreakpointValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"

import staticMarathonUsers from "../public/data/marathon-users.json"
import staticVisitors from "../public/data/unique-visitors.json"

const MarathonUsers = dynamic(
  () => import("../src/components/local/stats/MarathonUsers"),
  { ssr: false }
)
const TopParcelsTimeSpentComponent = dynamic(
  () => import("../src/components/local/stats/TopParcelsTimeSpent"),
  { ssr: false }
)
const UniqueVisitors = dynamic(
  () => import("../src/components/local/stats/UniqueVisitors"),
  { ssr: false }
)
const Explorers = dynamic(
  () => import("../src/components/local/stats/Explorers"),
  { ssr: false }
)
const RecentExplorers = dynamic(
  () => import("../src/components/local/stats/RecentExplorers"),
  { ssr: false }
)
const TotalVisitedParcels = dynamic(
  () => import("../src/components/local/stats/TotalVisitedParcels"),
  { ssr: false }
)
const RecentMarathonUsers = dynamic(
  () => import("../src/components/local/stats/RecentMarathonUsers"),
  { ssr: false }
)
// const RecentMarathonUsers = dynamic(
//   () => import("../src/components/local/stats/TempRecentMarathonUsers"),
//   { ssr: false }
// )

const GlobalPage: NextPage = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 2, xl: 2 })
  const [isLoading, setIsLoading] = useState(false)

  // --------------- marathon users -----------------
  const [res, setRes] = useState([])
  const fetchResult = async (url: any) => {
    const response = await fetch(url)
    const result = await response.json()
    setRes(result.data)
  }
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      setIsLoading(true)
      const url = "api/fetch/daily-user-timespent"
      fetchResult(url)
      setIsLoading(false)
    } else {
      setIsLoading(true)
      // @ts-ignore
      setRes(staticMarathonUsers)
      setIsLoading(false)
    }
  }, [])

  // --------------- unique visitors -----------------
  const [visitor, setVisitor] = useState([])
  const [visitorLoading, setVisitorLoading] = useState(false)
  const fetchVisitorResult = async (url: any) => {
    const response = await fetch(url)
    const result = await response.json()
    setVisitor(result.data)
  }
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      setVisitorLoading(true)
      const url = "api/fetch/unique-visitors"
      fetchVisitorResult(url)
      setVisitorLoading(false)
    } else {
      setVisitorLoading(true)
      // @ts-ignore
      setVisitor(staticVisitors)
      setVisitorLoading(false)
    }
  }, [])

  return (
    <Layout>
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <UniqueVisitors res={visitor} visitorLoading={visitorLoading} />
        <TotalVisitedParcels res={visitor} visitorLoading={visitorLoading} />
        <MarathonUsers isLoading={isLoading} res={res} />
        <RecentMarathonUsers isLoading={isLoading} res={res} />
        <Explorers />
        <RecentExplorers />
        <TopParcelsTimeSpentComponent />
        {/* <TopParcelsTimeSpentComponent /> */}
      </Grid>
    </Layout>
  )
}

export default GlobalPage
