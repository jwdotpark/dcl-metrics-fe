import { Button, Tooltip, Text } from "@chakra-ui/react"
import { FiBriefcase } from "react-icons/fi"
import { useRouter } from "next/router"
import { decrypt } from "../../lib/hooks/utils"
import { useEffect, useState } from "react"
import { sceneID } from "../../lib/data/sceneID"

const PrivateDashboardButton = () => {
  const router = useRouter()
  const [dashboardName, setDashboardName] = useState("")

  const handleClick = () => {
    const path = sceneID[localStorage.getItem("account")].name
    router.push(`/dashboard/${path}`)
  }

  useEffect(() => {
    const name = decrypt(JSON.parse(localStorage.getItem("auth"))).split("/")[2]
    setDashboardName(name)
  }, [])

  const title = sceneID[localStorage.getItem("account")].name

  return (
    <>
      <Tooltip
        p="2"
        fontSize="sm"
        borderRadius="md"
        label="Private Dashboard"
        placement="auto"
      >
        <Button
          onClick={handleClick}
          rightIcon={<FiBriefcase />}
          size="lg"
          variant="link"
        >
          <Text display={["none", "flex"]}>{title}</Text>
        </Button>
      </Tooltip>
    </>
  )
}

export default PrivateDashboardButton
