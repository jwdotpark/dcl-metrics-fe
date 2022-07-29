import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import type { NextPage } from "next"
import { Button, Grid, useBreakpointValue } from "@chakra-ui/react"
// import Layout from "../src/components/layout/layout"
import { isProduction } from "../src/lib/hooks/isProduction"
const Layout = dynamic(() => import("../src/components/layout/layout"), {
  ssr: false,
})

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
// const RecentMarathonUsers = dynamic(
//   () => import("../src/components/local/stats/TempRecentMarathonUsers"),
//   { ssr: false }
// )

const GlobalPage: NextPage = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 2, xl: 2 })
  const isDev = process.env.NODE_ENV === "development"

  const userInfo = {
    pathName: window.location.pathname,
    language: navigator.language,
    platform: navigator.platform,
    userAgent: navigator.userAgent,
  }

  // ----------------- user telemetry ---------------------------
  const [fingerPrint, setFingerPrint] = useState<any>()
  const fetchFingerprint = async () => {
    const url = "https://hutils.loxal.net/whois"
    const response = await fetch(url)
    const data = await response.json()
    setFingerPrint(data)
    console.log(fingerPrint)
  }

  const telemetryBody = {
    time: new Date().toISOString(),
    endpoint: userInfo.pathName,
    language: userInfo.language,
    platform: userInfo.platform,
    userAgent: userInfo.userAgent,
    ip: fingerPrint?.ip,
    city: fingerPrint?.city,
    country: fingerPrint?.country,
    timeZone: fingerPrint?.timeZone,
    fingerprint: fingerPrint?.fingerprint,
    tor: fingerPrint?.tor,
    latitude: fingerPrint?.latitude,
    longitude: fingerPrint?.longitude,
  }

  const postTelemetry = async () => {
    const url = "/api/fetch/telemetry"
    console.log("telemetry body: ", telemetryBody)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(telemetryBody),
    })
    const data = await response.json()
    setFingerPrint(data)
  }

  // fetch fingerprint and make it sure it's not null
  useEffect(() => {
    fetchFingerprint()
    console.log("fingerprint: ", fingerPrint)
  }, [])

  useEffect(() => {
    isDev && console.log("sending telemetry..")
    isDev && console.log("telemetryBody: ", telemetryBody)
    postTelemetry()
    // eslint-disable-next-line
  }, [])

  // // --------------- unique visitors -----------------
  // const [visitor, setVisitor] = useState([])
  // const [visitorLoading, setVisitorLoading] = useState(false)
  // const fetchVisitorResult = async (url: any) => {
  //   const response = await fetch(url)
  //   const result = await response.json()
  //   setVisitor(result.data)
  // }
  // useEffect(() => {
  //   if (process.env.NODE_ENV === "production") {
  //     setVisitorLoading(true)
  //     const url = "api/fetch/unique-visitors"
  //     fetchVisitorResult(url)
  //     setVisitorLoading(false)
  //   } else {
  //     setVisitorLoading(true)
  //     // @ts-ignore
  //     setVisitor(staticVisitors)
  //     setVisitorLoading(false)
  //   }
  // }, [])

  // // --------------- marathon users -----------------
  // const [res, setRes] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const fetchResult = async (url: any) => {
  //   const response = await fetch(url)
  //   const result = await response.json()
  //   setRes(result.data)
  // }
  // useEffect(() => {
  //   if (process.env.NODE_ENV === "production") {
  //     setIsLoading(true)
  //     const url = "api/fetch/daily-user-timespent"
  //     fetchResult(url)
  //     setIsLoading(false)
  //   } else {
  //     setIsLoading(true)
  //     // @ts-ignore
  //     setRes(staticMarathonUsers)
  //     setIsLoading(false)
  //   }
  // }, [])

  // // --------------- top parcel/scene time spent -----------------
  // const [parcel, setParcel] = useState([])
  // const [isParcelLoading, setIsParcelLoading] = useState(false)
  // const fetchParcelResult = async (url: any) => {
  //   const response = await fetch(url)
  //   const result = await response.json()
  //   setParcel(result.data)
  // }
  // useEffect(() => {
  //   if (process.env.NODE_ENV === "production") {
  //     setIsParcelLoading(true)
  //     const url = "api/fetch/top-parcels-timespent"
  //     fetchParcelResult(url)
  //     setIsParcelLoading(false)
  //   } else {
  //     setIsParcelLoading(true)
  //     // @ts-ignore
  //     setParcel(staticParcel)
  //     setIsParcelLoading(false)
  //   }
  // }, [])

  return (
    <Layout>
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <Button onClick={fetchFingerprint}>fetch fingerprint</Button>
        {/* <UniqueVisitors res={visitor} visitorLoading={visitorLoading} />
        <TotalVisitedParcels res={visitor} visitorLoading={visitorLoading} />
        <MarathonUsers isLoading={isLoading} res={res} />
        <RecentMarathonUsers isLoading={isLoading} res={res} />
        <Explorers />
        <RecentExplorers />
        <TopParcelsTimeSpentComponent
          parcel={parcel}
          isParcelLoading={isParcelLoading}
        />
        <TopParcelsTimeLogSpentVisit
          parcel={parcel}
          isParcelLoading={isParcelLoading}
        /> */}
      </Grid>
    </Layout>
  )
}

export default GlobalPage
