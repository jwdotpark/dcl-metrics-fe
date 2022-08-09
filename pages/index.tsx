import { useState, useEffect, useContext } from "react"
import dynamic from "next/dynamic"
import type { NextPage } from "next"
import { Grid, useBreakpointValue } from "@chakra-ui/react"
const Layout = dynamic(() => import("../src/components/layout/layout"), {
  ssr: false,
})

import staticGlobal from "../public/data/global.json"
import staticMarathonUsers from "../public/data/marathon-users.json"
import staticVisitors from "../public/data/unique-visitors.json"
import staticParcel from "../public/data/top-visited-parcel.json"

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
const TopParcelsTimeLogSpentVisit = dynamic(
  () => import("../src/components/local/stats/TopParcelsTimeLogSpentVisit"),
  { ssr: false }
)

const GlobalPage: NextPage = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 2, xl: 2 })
  const ENV = process.env.NEXT_PUBLIC_ENV

  const [gridNum, setGridNum] = useState(2)

  // --------------- global fetch -----------------
  const [data, setData] = useState(staticGlobal)
  const [isDataLoading, setIsDataLoading] = useState(false)

  const fetchData = async () => {
    setIsDataLoading(true)
    const response = await fetch("/api/fetch/global")
    const result = await response.json()
    setData(result.data)
    setIsDataLoading(false)
  }

  useEffect(() => {
    if (ENV === "prod") {
      fetchData()
    }
    console.log("origin: ", data)
    // eslint-disable-next-line
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
    if (ENV === "prod") {
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
    // eslint-disable-next-line
  }, [])

  // --------------- marathon users -----------------
  const [res, setRes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const fetchResult = async (url: any) => {
    const response = await fetch(url)
    const result = await response.json()
    setRes(result.data)
  }

  useEffect(() => {
    if (ENV === "prod") {
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
    // eslint-disable-next-line
  }, [])

  // --------------- top parcel/scene time spent -----------------
  const [parcel, setParcel] = useState([])
  const [isParcelLoading, setIsParcelLoading] = useState(false)
  const fetchParcelResult = async (url: any) => {
    const response = await fetch(url)
    const result = await response.json()
    setParcel(result.data)
  }
  useEffect(() => {
    if (ENV === "prod") {
      setIsParcelLoading(true)
      const url = "api/fetch/top-parcels-timespent"
      fetchParcelResult(url)
      setIsParcelLoading(false)
    } else {
      setIsParcelLoading(true)
      // @ts-ignore
      setParcel(staticParcel)
      setIsParcelLoading(false)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Layout>
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <UniqueVisitors res={data.global} visitorLoading={isDataLoading} />
        <TotalVisitedParcels res={data.global} visitorLoading={isDataLoading} />
        <MarathonUsers
          res={data.users.daily.time_spent}
          isLoading={isDataLoading}
        />
        <RecentMarathonUsers
          res={data.users.daily.time_spent}
          isLoading={isDataLoading}
        />
        <Explorers
          res={data.users.top.parcels_visited}
          isLoading={isDataLoading}
        />
        <RecentExplorers
          res={data.users.daily.parcels_visited}
          isLoading={isDataLoading}
        />
        <TopParcelsTimeSpentComponent
          parcel={parcel}
          isParcelLoading={isParcelLoading}
        />
        <TopParcelsTimeLogSpentVisit
          parcel={parcel}
          isParcelLoading={isParcelLoading}
        />
      </Grid>
    </Layout>
  )
}

export default GlobalPage
