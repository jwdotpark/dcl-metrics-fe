/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../../src/components/layout/layout"
import { useRouter } from "next/router"
import { Flex, Button, Box, Text, Center, Spacer } from "@chakra-ui/react"
import Scene from "../../src/components/local/stats/Scene"
import { useEffect, useState } from "react"
import { decrypt } from "../../src/lib/hooks/utils"
import { sendNotification } from "../../src/lib/hooks/sendNotification"
const axios = require("axios").default
import fs from "fs"

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "ups_store" } },
      { params: { id: "goldfish" } },
      { params: { id: "edifice" } },
    ],
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const day = 60 * 60 * 24 * 365
  const name = context.params.id
  const staticData = require(`../../public/data/cached_${name}.json`)

  const isProd = process.env.NEXT_PUBLIC_STAGING === "false"
  const url = isProd
    ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "dashboard/" + name
    : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "dashboard/" + name

  if (process.env.NEXT_PUBLIC_STAGING === "false") {
    const response = await axios
      .get(url, {
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
      .catch((error) => {
        console.log(error)
        return { props: { data: staticData }, revalidate: day }
      })

    if (response.status === 200) {
      fs.writeFileSync(
        `./public/data/cached_${name}.json`,
        JSON.stringify(response.data)
      )
    } else if (response.status !== 200) {
      sendNotification(response, name, "error")
    }

    const data = await response.data
    return {
      props: { data },
      revalidate: day,
    }
  }
  if (process.env.NEXT_PUBLIC_STAGING === "true") {
    const response = await fetch(url)
    const data = await response.json()
    return {
      props: { data },
      revalidate: day,
    }
  }
}

const DashboardPage = (props) => {
  if (Object.keys(props.data).length === 0) {
    throw Error("Page prop is missing!")
  }

  const router = useRouter()
  const { data } = props
  const dashboard = data

  const availableDate = dashboard.available_dates
  const latestDay = availableDate[availableDate.length - 1].replace(/-/g, "/")

  const [res, setRes] = useState([
    dashboard.result[availableDate[availableDate.length - 1]],
  ])
  const dailyUsers = data.daily_users

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState(new Date(latestDay))

  const tempErrorReport = () => {
    const response = {
      status: 404,
      statusText: "Page prop is missing",
    }
    sendNotification(
      response,
      "dashboard",
      "dashboard page is failed to render"
    )
  }

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

  if (!props) {
    return (
      <Layout>
        <Center minH="calc(100vh - 7rem)">
          <Box
            className="umami--view--dashboard-missing-props"
            textAlign="center"
          >
            <Text my="4" fontSize="8xl">
              Page can&apos;t download the data for charts!
            </Text>
            <Text my="4" fontSize="xl">
              This only happens in specific region at the moment, related data
              and error message has been reported. We are working on it.
            </Text>
            <Text my="4" fontSize="xl">
              Sorry for the inconvenience!
            </Text>
          </Box>
        </Center>
      </Layout>
    )
  }

  return (
    <Layout>
      {isLoggedIn ? (
        <Box minH="calc(100vh - 7rem)">
          {props && (
            <Scene
              res={res}
              date={date}
              setDate={setDate}
              availableDate={availableDate}
              isLoading={isLoading}
              dailyUsers={dailyUsers}
            />
          )}
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
