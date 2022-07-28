import { Box } from "@chakra-ui/react"
import Head from "next/head"
import SidebarWithHeader from "../global/SidebarWithHeader"

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
