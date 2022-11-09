import { Button, Tooltip } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FiLogOut } from "react-icons/fi"

const LogOutButton = () => {
  const router = useRouter()
  const handleClick = () => {
    localStorage.removeItem("auth")
    router.push("/")
  }
  return (
    <>
      <Tooltip
        p="2"
        fontSize="sm"
        borderRadius="md"
        label="Log Out"
        placement="auto"
      >
        <Button onClick={handleClick} size="lg" variant="link">
          <FiLogOut />
        </Button>
      </Tooltip>
    </>
  )
}

export default LogOutButton
