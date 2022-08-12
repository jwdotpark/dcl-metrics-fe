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

  useEffect(() => {
    if (sessionStorage.getItem("fingerPrint") === null) {
      fetchFingerprint()
    }
    if (
      process.env.NEXT_PUBLIC_ENV === "prod" &&
      process.env.NEXT_PUBLIC_STAGING !== "true"
    ) {
      setTimeout(() => {
        const fingerPrintInfo = JSON.parse(
          sessionStorage.getItem("fingerPrint")
        )
        postTelemetry(fingerPrintInfo)
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
