import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  isDev,
  fetchFingerprint,
  postTelemetry,
} from "../../lib/hooks/telemetry"
const SidebarWithHeader = dynamic(() => import("../global/SidebarWithHeader"), {
  ssr: false,
})

const Layout = ({ children }: any) => {
  const router = useRouter()

  // telemetry on initial access or path change
  const ENV = process.env.NEXT_PUBLIC_ENV
  const localFingerPrint = sessionStorage.getItem("fingerPrint")

  useEffect(() => {
    if (localFingerPrint === null) {
      fetchFingerprint()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (ENV === "prod" && localFingerPrint !== null) {
      setTimeout(() => {
        const fingerPrintInfo = sessionStorage.getItem("fingerPrint")
        postTelemetry(JSON.parse(fingerPrintInfo))
      }, 500)
    }
    // eslint-disable-next-line
  }, [router.pathname])

  return (
    <>
      <SidebarWithHeader {...{ ...children }}>{children}</SidebarWithHeader>
    </>
  )
}

export default Layout
