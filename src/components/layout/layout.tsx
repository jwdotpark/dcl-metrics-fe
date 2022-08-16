import dynamic from "next/dynamic"
const SidebarWithHeader = dynamic(() => import("../global/SidebarWithHeader"), {
  ssr: false,
})

const Layout = ({ children }: any) => {
  return (
    <>
      <SidebarWithHeader {...{ ...children }}>{children}</SidebarWithHeader>
    </>
  )
}

export default Layout
