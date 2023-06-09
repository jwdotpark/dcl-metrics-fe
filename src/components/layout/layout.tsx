import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import useSWR from "swr"
const SidebarWithHeader = dynamic(() => import("../global/SidebarWithHeader"), {
  ssr: false,
})

const Layout = ({ children }: any) => {
  const [res, setRes] = useState({})
  const { data } = useSWR("/api/get-psa", (url) =>
    fetch(url).then((r) => r.json())
  )

  useEffect(() => {
    if (data) {
      setRes(data.latestPost)
    } else {
      setRes({})
    }
  }, [])

  console.log("res", res)

  return (
    <>
      <SidebarWithHeader psa={res} {...{ ...children }}>
        {children}
      </SidebarWithHeader>
    </>
  )
}

export default Layout
