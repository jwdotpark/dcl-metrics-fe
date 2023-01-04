import { Box, FlexProps, Flex, Center, Icon } from "@chakra-ui/react"
import { ReactText } from "react"
import { IconType } from "react-icons"

interface NavItemProps extends FlexProps {
  icon: IconType
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box _focus={{ boxShadow: "none" }} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        mx="2"
        px="1"
        borderRadius="lg"
        _hover={{
          bg: "gray.400",
          color: "white",
        }}
        cursor="pointer"
        role="group"
        {...rest}
      >
        {icon && (
          <Center px="2" py="4">
            <Icon
              as={icon}
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
            />
          </Center>
        )}
        {children}
      </Flex>
    </Box>
  )
}

export default NavItem
