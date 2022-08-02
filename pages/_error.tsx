import { Center, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Layout from "../src/components/layout/layout"

function Error({ statusCode }) {
  const router = useRouter()
  useEffect(() => {
    router.push(`/error/${statusCode}`)
    // eslint-disable-next-line
  }, [])
  return <Layout></Layout>
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
