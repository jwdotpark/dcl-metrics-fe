import Head from "next/head"
import dynamic from "next/dynamic"
const SidebarWithHeader = dynamic(() => import("../global/SidebarWithHeader"), {
  ssr: false,
})
// import SidebarWithHeader from "../global/SidebarWithHeader"

const Layout = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>DCL Metrics</title>
        <meta name="DCL Metrics" content="DCL Metrics" />
        <link rel="shortcut icon" sizes="32x32" href="/images/favicon.ico" />
      </Head>
      <SidebarWithHeader {...{ ...children }}>{children}</SidebarWithHeader>
    </>
  )
}

export default Layout
