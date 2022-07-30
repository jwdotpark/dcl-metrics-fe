import dynamic from "next/dynamic"
const SidebarWithHeader = dynamic(() => import("../global/SidebarWithHeader"), {
  ssr: false,
})
// import SidebarWithHeader from "../global/SidebarWithHeader"

const Layout = ({ children }: any) => {
  return (
    <>
      <SidebarWithHeader {...{ ...children }}>{children}</SidebarWithHeader>
    </>
  )
}

export default Layout
