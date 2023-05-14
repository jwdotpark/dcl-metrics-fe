import { Center } from "@chakra-ui/react"
import Layout from "../../src/components/layout/layout"
//import SignIn from "../../src/components/auth/SignIn"
//import { encrypt, decrypt } from "../../src/lib/hooks/utils"
//import { useEffect, useState } from "react"
//import { useRouter } from "next/router"

const Dashboard = () => {
  //const router = useRouter()
  //const [auth, setAuth] = useState("")
  //const [msg, setMsg] = useState("")
  //const [isLoggedIn, setIsLoggedIn] = useState(false)

  //useEffect(() => {
  //  setMsg("Setting auth...")
  //  setAuth(JSON.parse(localStorage.getItem("auth")))
  //  setMsg("auth set")
  //}, [])

  //useEffect(() => {
  //  setMsg("Decrypting auth...")
  //  const path = decrypt(auth)
  //  if (path) {
  //    setMsg("Authorized, now redirecting...")
  //    setIsLoggedIn(!isLoggedIn)

  //    router.push(path)
  //  }
  //  // eslint-disable-next-line react-hooks/exhaustive-deps
  //}, [auth])

  return (
    <Layout>
      <Center h="calc(100vh - 8rem)">{/*<SignIn />*/}</Center>
      {/*<Center h="calc(100vh - 8rem)">
        {isLoggedIn && <Text>{msg}</Text>}
        {!isLoggedIn && <SignIn />}
      </Center>*/}
    </Layout>
  )
}

export default Dashboard
