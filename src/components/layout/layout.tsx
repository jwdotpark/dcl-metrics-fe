import { Box } from "@chakra-ui/react"
import Head from "next/head"
import SidebarWithHeader from "../global/SidebarWithHeader"

const Layout = ({ children }: any) => {
  return (
    <div>
      <Head>
        <title>DCL Stats</title>
        <meta name="DCL Stats" content="DCL Stats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SidebarWithHeader {...{ ...children }}>{children}</SidebarWithHeader>
    </div>
  )
}

export default Layout
