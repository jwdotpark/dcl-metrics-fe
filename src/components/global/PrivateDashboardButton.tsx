import { Button, Tooltip, useColorMode } from "@chakra-ui/react"
import { FiBriefcase } from "react-icons/fi"
import { useRouter } from "next/router"
import { decrypt } from "../../lib/hooks/utils"

const PrivateDashboardButton = () => {
  const router = useRouter()
  const handleClick = () => {
    const path = decrypt(JSON.parse(localStorage.getItem("auth")))
    router.push(path)
  }
  return (
    <>
      <Tooltip
        p="2"
        fontSize="sm"
        borderRadius="md"
        label="Private Dashboard"
        placement="auto"
      >
        <Button onClick={handleClick} size="lg" variant="link">
          <FiBriefcase />
        </Button>
      </Tooltip>
    </>
  )
}

export default PrivateDashboardButton
