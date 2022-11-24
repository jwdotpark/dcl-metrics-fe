import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import { FiMenu } from "react-icons/fi"

const MapMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        bg="gray.800"
        aria-label="Options"
        icon={<FiMenu />}
        size="sm"
        variant="outline"
      />
      <MenuList bg="gray.800">
        <MenuItem>New Tab</MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem>Open Closed Tab</MenuItem>
        <MenuItem>Open File...</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MapMenu
