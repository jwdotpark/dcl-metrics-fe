import {
  Text,
  Image,
  Box,
  FlexProps,
  Flex,
  useColorModeValue,
  IconButton,
  HStack,
} from "@chakra-ui/react"
import logo from "public/images/logo.png"
import { FiMenu } from "react-icons/fi"
import ColorButton from "../ColorButton"
import LogOutButton from "../LogOutButton"
import PrivateDashboardButton from "../PrivateDashboardButton"

interface MobileProps extends FlexProps {
  sidebarStatus: string
  onOpen: () => void
}

const MobileNav = ({ sidebarStatus, onOpen, ...rest }: MobileProps) => {
  const auth = JSON.parse(localStorage.getItem("auth"))
  return (
    <Flex
      align="center"
      justify={{ base: "space-between", md: "flex-end" }}
      h="20"
      ml={{ base: 0, md: sidebarStatus }}
      px={{ base: 4, md: 4 }}
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      transition=".25s ease"
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="open menu"
        icon={<FiMenu />}
        onClick={onOpen}
        variant="outline"
      />

      <Box
        display={{ base: "flex", md: "none" }}
        fontFamily="sans-serif"
        fontSize="2xl"
        fontWeight="bold"
      >
        <HStack>
          <Image boxSize="26px" shadow="md" alt="logo" src={logo.src} />
          <Text
            fontSize="20px"
            fontWeight="extrabold"
            css={{ transform: "translateY(-1px)" }}
            data-testid="title"
          >
            DCL Metrics
          </Text>
        </HStack>
      </Box>
      <HStack spacing={{ base: "0", md: "6" }}>
        {auth && (
          <>
            <PrivateDashboardButton />
            <LogOutButton />
          </>
        )}
        <ColorButton />
      </HStack>
    </Flex>
  )
}

export default MobileNav
