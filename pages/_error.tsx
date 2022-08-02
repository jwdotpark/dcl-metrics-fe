import { useRouter } from "next/router"
import { useEffect } from "react"
import Layout from "../src/components/layout/layout"

function Error({ statusCode }) {
  const router = useRouter()
  useEffect(() => {
    if (400 <= statusCode && statusCode < 500) {
      router.push(`/error/${statusCode}`)
    } else if (500 <= statusCode) {
      router.push("/error/500")
    } else {
      router.push("/error/unknown")
    }
    // eslint-disable-next-line
  }, [])
  return <Layout></Layout>
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
