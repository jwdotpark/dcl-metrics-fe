import { Button, Tooltip, Text } from "@chakra-ui/react"
import { FiBriefcase } from "react-icons/fi"
import { useRouter } from "next/router"
import { decrypt } from "../../lib/hooks/utils"
import { useEffect, useState } from "react"

const PrivateDashboardButton = () => {
  const router = useRouter()
  const [dashboardName, setDashboardName] = useState("")

  const handleClick = () => {
    const path = decrypt(JSON.parse(localStorage.getItem("auth")))
    router.push(path)
  }

  useEffect(() => {
    const name = decrypt(JSON.parse(localStorage.getItem("auth"))).split("/")[2]
    setDashboardName(name)
  }, [])

  const title = localStorage.getItem("account")
  console.log(title)

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
          <Text>{title}</Text>
        </Button>
      </Tooltip>
    </>
  )
}

export default PrivateDashboardButton
