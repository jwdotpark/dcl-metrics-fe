import { Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FiLogOut } from "react-icons/fi"
import ToolTip from "../layout/local/ToolTip"

const LogOutButton = () => {
  const router = useRouter()
  const handleClick = () => {
    localStorage.removeItem("auth")
    router.push("/")
  }
  return (
    <ToolTip label="Log Out">
      <Button
        display={["none", "flex"]}
        onClick={handleClick}
        size="lg"
        variant="link"
      >
        <FiLogOut />
      </Button>
    </ToolTip>
  )
}

export default LogOutButton
