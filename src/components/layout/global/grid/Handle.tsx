import { IconButton } from "@chakra-ui/react"
import { FiMove } from "react-icons/fi"

export const Handle = () => {
  return (
    <IconButton
      className="drag-handle"
      fontSize="20px"
      aria-label="move button"
      icon={<FiMove size="13px" />}
      rounded="full"
      size="xs"
      variant="solid"
    />
  )
}
