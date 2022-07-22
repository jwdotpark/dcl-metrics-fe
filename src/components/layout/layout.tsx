import SidebarWithHeader from "../global/Sidebar"

const Layout = ({ children }: any) => {
  return (
    <div>
      <SidebarWithHeader {...{ ...children }} />
      {children}
    </div>
  )
}

export default Layout
