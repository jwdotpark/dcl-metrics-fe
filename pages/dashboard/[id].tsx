import Layout from "../../src/components/layout/layout"
import { useRouter } from "next/router"
import { Box, Text, Center } from "@chakra-ui/react"
import Scene from "../../src/components/local/stats/Scene"
import { useEffect, useState } from "react"
import { decrypt } from "../../src/lib/hooks/utils"
import tempData from "../../public/data/temp.json"

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "ups_store" } }, { params: { id: "goldfish" } }],
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const day = 60 * 60 * 24
  const name = context.params.id
  const isProd = process.env.NEXT_PUBLIC_STAGING === "false"
  const url = isProd
    ? `${process.env.NEXT_PUBLIC_PROD_ENDPOINT}dashboard/${name}`
    : `${process.env.NEXT_PUBLIC_DEV_ENDPOINT}dashboard/${name}`
  const absURL = "https://dcl-metrics.com/api/fetch"

  const res = await fetch(absURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
  })
  const data = await res.json()
  return {
    props: { data, name },
    revalidate: day,
  }
}

const DashboardPage = (props) => {
  const router = useRouter()
  const { data, name } = props
  const dashboard = data.data

  const availableDate = dashboard.available_dates
  const latestDay = availableDate[availableDate.length - 1].replace(/-/g, "/")

  const [res, setRes] = useState([
    dashboard.result[availableDate[availableDate.length - 1]],
  ])

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState(new Date(latestDay))

  useEffect(() => {
    const target = new Date(date)
    target.setDate(target.getDate() + 1)
    const targetString = target.toISOString().split("T")[0]
    setRes([dashboard.result[targetString]])
    // eslint-disable-next-line
  }, [date])

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const pathStr = window.location.pathname
    if (decrypt(auth) !== pathStr) {
      setIsLoggedIn(false)
      router.push("/dashboard")
    } else {
      setIsLoggedIn(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      {isLoggedIn ? (
        <Box minH="calc(100vh - 7rem)">
          <Scene
            res={res}
            date={date}
            setDate={setDate}
            availableDate={availableDate}
            isLoading={isLoading}
          />
        </Box>
      ) : (
        <Center h="calc(100vh - 6rem)">
          <Text fontSize="3xl">You are not authenticated</Text>
        </Center>
      )}
    </Layout>
  )
}

export default DashboardPage
