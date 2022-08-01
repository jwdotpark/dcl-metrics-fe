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
// import SidebarWithHeader from "../global/SidebarWithHeader"

const Layout = ({ children }: any) => {
  const router = useRouter()

  useEffect(() => {
    if (!isDev) {
      fetchFingerprint()
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
