import { Button, Text } from "@chakra-ui/react"
import { FiBriefcase } from "react-icons/fi"
import { useRouter } from "next/router"
import { decrypt } from "../../lib/hooks/utils"
import { useEffect, useState } from "react"
import { sceneID } from "../../lib/data/sceneID"
import ToolTip from "../layout/local/ToolTip"

const PrivateDashboardButton = () => {
  const router = useRouter()
  // eslint-disable-next-line no-unused-vars
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
    <ToolTip label="Private Dashboard">
      <Button
        onClick={handleClick}
        rightIcon={<FiBriefcase />}
        size="lg"
        variant="link"
      >
        <Text display={["none", "flex"]}>{title}</Text>
      </Button>
    </ToolTip>
  )
}

export default PrivateDashboardButton
