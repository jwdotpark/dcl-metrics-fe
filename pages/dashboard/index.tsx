import { Box, Center } from "@chakra-ui/react"
import Layout from "../../src/components/layout/layout"
import SignIn from "../../src/components/auth/SignIn"
import { encrypt, decrypt } from "../../src/lib/hooks/utils"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const Dashboard = () => {
  const router = useRouter()
  const [isloggedIn, setIsloggedIn] = useState(false)
  const [auth, setAuth] = useState("")

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")))
    const path = decrypt(auth)
    if (decrypt(auth)) {
      router.push(path)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <Center h="calc(100vh - 8rem)">
        <SignIn />
      </Center>
    </Layout>
  )
}

export default Dashboard
