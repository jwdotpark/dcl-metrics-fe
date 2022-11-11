import { Box, Center } from "@chakra-ui/react"
import Layout from "../../src/components/layout/layout"
import SignIn from "../../src/components/auth/SignIn"
import { encrypt, decrypt } from "../../src/lib/hooks/utils"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const Dashboard = () => {
  const router = useRouter()
  const [auth, setAuth] = useState("")

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")))
  }, [])

  useEffect(() => {
    const path = decrypt(auth)
    if (path) {
      router.push(path)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  return (
    <Layout>
      <Center h="calc(100vh - 8rem)">
        <SignIn />
      </Center>
    </Layout>
  )
}

export default Dashboard
