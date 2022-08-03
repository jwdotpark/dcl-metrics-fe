import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useEffect } from "react"
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
  const ENV = process.env.NEXT_PUBLIC_ENV
  // telemetry
  const isServer = typeof window === "undefined"
  const userInfo = {
    pathName: window.location.pathname,
    language: !isServer && navigator.language,
    platform: !isServer && navigator.platform,
    userAgent: !isServer && navigator.userAgent,
  }

  useEffect(() => {
    if (ENV === "prod") {
      fetchFingerprint()
      setTimeout(() => {
        const fingerPrintInfo = sessionStorage.getItem("fingerPrint")
        postTelemetry(userInfo, JSON.parse(fingerPrintInfo))
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
