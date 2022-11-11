/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../../src/components/layout/layout"
import { useRouter } from "next/router"
import { Box, Text, Center } from "@chakra-ui/react"
import Scene from "../../src/components/local/stats/Scene"
import { useEffect, useState } from "react"
import { decrypt } from "../../src/lib/hooks/utils"
const axios = require("axios").default

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

  if (process.env.NEXT_PUBLIC_STAGING === "false") {
    console.log("prod")
    const response = await axios.get(url, {
      method: "get",
      proxy: {
        protocol: "http",
        host: process.env.FIXIE_HOST,
        port: 80,
        auth: {
          username: "fixie",
          password: process.env.FIXIE_TOKEN,
        },
      },
    })
    const data = await response.json()
    return {
      props: { data, name },
      revalidate: day,
    }
  }
  if (process.env.NEXT_PUBLIC_STAGING === "true") {
    console.log("dev")
    const response = await fetch(url)
    const data = await response.json()
    return {
      props: { data, name },
      revalidate: day,
    }
  }
}

const DashboardPage = (props) => {
  const router = useRouter()
  const { data, name } = props
  const dashboard = data

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
          <Text fontSize="3xl"></Text>
        </Center>
      )}
    </Layout>
  )
}

export default DashboardPage
