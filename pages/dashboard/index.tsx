import { Box, Center } from "@chakra-ui/react"
import Layout from "../../src/components/layout/layout"
import SignIn from "../../src/components/auth/SignIn"

const Dashboard = () => {
  return (
    <Layout>
      <Center h="calc(100vh - 7rem)">
        <SignIn />
      </Center>
    </Layout>
  )
}

export default Dashboard
