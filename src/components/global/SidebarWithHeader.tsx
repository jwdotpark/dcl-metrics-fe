// @ts-nocheck
import React, { ReactNode, useState } from "react"
import {
  Tooltip,
  Center,
  Spacer,
  Image,
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  // Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  useColorMode,
} from "@chakra-ui/react"
import {
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiMenu,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiAnchor,
  FiMap,
} from "react-icons/fi"
import { IconType } from "react-icons"
import { ReactText } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import logo from "../../../public/images/logo.png"
import ColorButton from "./ColorButton"

interface LinkItemProps {
  name: string
  icon: IconType
}

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const sidebarCollapsed = localStorage.getItem("sidebar-collapsed")
  const [sidebarOpen, setSidebarOpen] = useState(
    sidebarCollapsed ? false : true
  )

  const handleSidebar = () => {
    if (sidebarOpen) {
      setSidebarOpen(false)
      localStorage.setItem("sidebar-collapsed", "open")
    } else {
      setSidebarOpen(true)
      localStorage.removeItem("sidebar-collapsed")
    }
  }

  const sidebarStatus = sidebarOpen ? "180px" : "60px"

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "blackAlpha.900")}>
      <SidebarContent
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarStatus={sidebarStatus}
        handleSidebar={handleSidebar}
        isOpen={isOpen}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} sidebarStatus={sidebarStatus} />
      {/* NOTE */}
      <Box ml={{ base: 0, md: sidebarStatus }} p="4" data-testid="sidebar">
        {children}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({
  sidebarOpen,
  setSidebarOpen,
  sidebarStatus,
  handleSidebar,
  isOpen,
  onClose,
  ...rest
}: SidebarProps) => {
  const router = useRouter()
  const { colorMode } = useColorMode()
  return (
    <Box
      transition=".25s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      // NOTE
      w={{ base: "full", md: sidebarStatus }}
      pos="fixed"
      h="full"
      {...rest}
      overflow="clip"
    >
      <Flex
        h="20"
        alignItems="center"
        ml="4"
        justifyContent="space-between"
        cursor="pointer"
      >
        <Link href="/" passHref>
          <HStack>
            <Image src={logo.src} alt="logo" boxSize="26px" boxShadow="md" />
            <Text
              wordBreak="keep-all"
              fontSize="20px"
              fontWeight="extrabold"
              css={{ transform: "translateY(-1px)" }}
              data-testid="sidebar-title"
            >
              {sidebarOpen && "DCL Metrics"}
              {/* DCL Metrics */}
            </Text>
          </HStack>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex direction="column" gap="1" h="calc(100vh - 6rem)">
        <Tooltip
          label="Global Dashboard"
          placement="right"
          color={useColorModeValue("black", "white")}
          fontSize="sm"
          bg={useColorModeValue("gray.300", "gray.700")}
          borderRadius="md"
        >
          <Box>
            <Link href="/" passHref>
              <a>
                <NavItem
                  height="3rem"
                  icon={FiTrendingUp}
                  bg={
                    router.pathname === "/" && // eslint-disable-next-line
                    useColorModeValue("gray.200", "gray.700")
                  }
                >
                  <Text fontSize="lg" as={router.pathname === "/" && "u"}>
                    Global
                  </Text>
                </NavItem>
              </a>
            </Link>
          </Box>
        </Tooltip>
        <Tooltip
          label="Roadmap"
          placement="right"
          fontSize="sm"
          bg={useColorModeValue("gray.300", "gray.700")}
          color={useColorModeValue("black", "white")}
          borderRadius="md"
        >
          <Box>
            <Link href="/roadmap" passHref>
              <a>
                <NavItem
                  height="3rem"
                  icon={FiMap}
                  bg={
                    router.pathname === "/roadmap" &&
                    // eslint-disable-next-line
                    useColorModeValue("gray.200", "gray.700")
                  }
                >
                  <Text
                    fontSize="lg"
                    as={router.pathname === "/roadmap" && "u"}
                  >
                    Roadmap
                  </Text>
                </NavItem>
              </a>
            </Link>
          </Box>
        </Tooltip>
        <Tooltip
          label="About"
          placement="right"
          fontSize="sm"
          bg={useColorModeValue("gray.300", "gray.700")}
          color={useColorModeValue("black", "white")}
          borderRadius="md"
        >
          <Box>
            <Link href="/about" passHref>
              <a>
                <NavItem
                  height="3rem"
                  icon={FiCompass}
                  bg={
                    router.pathname === "/about" &&
                    // eslint-disable-next-line
                    useColorModeValue("gray.200", "gray.700")
                  }
                >
                  <Text fontSize="lg" as={router.pathname === "/about" && "u"}>
                    About
                  </Text>
                </NavItem>
              </a>
            </Link>
          </Box>
        </Tooltip>
        <Spacer />
        <Tooltip
          label={sidebarOpen ? "Collapse" : "Expand"}
          placement="right"
          fontSize="sm"
          bg={useColorModeValue("gray.300", "gray.700")}
          color={useColorModeValue("black", "white")}
          borderRadius="md"
        >
          <Box display={{ base: "none", md: "block" }}>
            <NavItem
              height="3rem"
              icon={sidebarOpen ? FiArrowLeftCircle : FiArrowRightCircle}
              onClick={handleSidebar}
            >
              <Text fontSize="xl">Collapse</Text>
            </NavItem>
          </Box>
        </Tooltip>
      </Flex>
      {/* {LinkItems.map((link) => (
        <Link key={link.name} href={`/${makeName(link.name)}`}>
          <NavItem icon={link.icon}>
            <Text as={router.pathname === "/" + makeName(link.name) && "u"}>
              {link.name === "Global" ? "Global" : link.name}
            </Text>
          </NavItem>
        </Link>
      ))} */}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        px="1"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Center px="2" py="4">
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          </Center>
        )}
        {children}
      </Flex>
    </Box>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ sidebarStatus, onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      // NOTE
      transition=".25s ease"
      ml={{ base: 0, md: sidebarStatus }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        <HStack>
          <Image src={logo.src} alt="logo" boxSize="26px" boxShadow="md" />
          <Text
            fontSize="23px"
            fontWeight="extrabold"
            css={{ transform: "translateY(-1px)" }}
            data-testid="title"
          >
            DCL Metrics
          </Text>
        </HStack>
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <ColorButton />
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        {/* <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src="./profile.jpeg" />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">User</Text>
                  <Text fontSize="xs" color="gray.600">
                    User Role
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex> */}
      </HStack>
    </Flex>
  )
}
