import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Button,
  Box,
} from "@chakra-ui/react"

const MapMenu = ({ properties, selectedProp, setSelectedProp }) => {
  const formatName = (name) => {
    return name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const PropIcon = ({ property }) => {
    const { color } = property
    return <Box w="4" h="4" bg={color && color} borderRadius="sm" />
  }

  const MapMenuList = () => {
    return (
      <>
        {properties.map((property, index) => {
          return (
            <MenuItem
              key={index}
              color="gray.100"
              _hover={{ bg: "gray.700" }}
              icon={<PropIcon property={property} />}
              onClick={() => {
                setSelectedProp(property)
              }}
            >
              {formatName(property.name)}
            </MenuItem>
          )
        })}
      </>
    )
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        color="gray.100"
        bg="gray.800"
        _hover={{ bg: "gray.900" }}
        _active={{ bg: "gray.900" }}
        aria-label="Options"
        leftIcon={<PropIcon property={selectedProp} />}
        size="sm"
        variant="solid"
      >
        {formatName(selectedProp.name)}
      </MenuButton>
      <MenuList bg="gray.800" border="none">
        <MapMenuList />
      </MenuList>
    </Menu>
  )
}

export default MapMenu
