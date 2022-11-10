import Layout from "../../src/components/layout/layout"
import { useRouter } from "next/router"
import { Box, Text, Center } from "@chakra-ui/react"
import Scene from "../../src/components/local/stats/Scene"
import { useEffect, useState } from "react"
import { decrypt } from "../../src/lib/hooks/utils"

export async function getServerSideProps(context) {
  const name = context.query.id
  const isProd = process.env.NEXT_PUBLIC_STAGING === "false"
  const url = isProd
    ? `${process.env.NEXT_PUBLIC_PROD_ENDPOINT}/dashboard/${name}`
    : `${process.env.NEXT_PUBLIC_DEV_ENDPOINT}/dashboard/${name}`

  const res = await fetch(url)
  const dashboard = await res.json()

  return {
    props: { dashboard, name },
  }
}

const DashboardPage = (props) => {
  const router = useRouter()
  const { dashboard, name } = props
  const [res, setRes] = useState([dashboard.result])
  const availableDate = dashboard.available_dates

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const d = new Date(availableDate[availableDate.length - 1])
  const [date, setDate] = useState(
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000)
  )

  const fetchResult = async (url) => {
    setIsLoading(true)
    const response = await fetch("/api/fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    })
    const data = await response.json()
    setRes([data.data.result])
    setIsLoading(false)
  }

  useEffect(() => {
    const target = new Date(date).toISOString().split("T")[0]
    const nextDay = new Date(target)
    nextDay.setDate(nextDay.getDate() + 1)
    const res = nextDay.toISOString().split("T")[0]

    const isProd = process.env.NEXT_PUBLIC_STAGING === "false"
    const url = isProd
      ? `${process.env.NEXT_PUBLIC_PROD_ENDPOINT}dashboard/${name}?date=${res}`
      : `${process.env.NEXT_PUBLIC_DEV_ENDPOINT}dashboard/${name}?date=${res}`
    fetchResult(url)
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
