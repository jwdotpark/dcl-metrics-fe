// @ts-nocheck
import React, { ReactNode, useEffect, useState } from "react"
import {
  useToast,
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
  FiFrown,
  FiUsers,
  FiMapPin,
  FiPackage,
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

  // desktop recommendation toast
  const toast = useToast()
  useEffect(() => {
    if (
      window.innerWidth < 768 &&
      sessionStorage.getItem("toast-desktop-status") !== "closed"
    ) {
      toast({
        title: "Desktop is recommended. ☹️",
        description: " For better experience, please use desktop!",
        status: "info",
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => {
          sessionStorage.setItem("toast-desktop-status", "closed")
        },
      })
    }
    // eslint-disable-next-line
  }, [])

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
        onClose={onClose}
        onOverlayClick={onClose}
        placement="left"
        returnFocusOnClose={false}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} sidebarStatus={sidebarStatus} />
      {/* <Box ml={{ base: 0, md: sidebarStatus }} p="4" data-testid="sidebar">
        {children}
      </Box> */}
      <Flex
        align="center"
        justify="center"
        w={["100%", `calc(100% - ${sidebarStatus})`]}
        ml={{ base: 0, md: sidebarStatus }}
      >
        <Box w="100%" maxW="1600px" p="4" data-testid="sidebar">
          {children}
        </Box>
      </Flex>
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

  return (
    <Box
      pos="fixed"
      w={{ base: "full", md: sidebarStatus }}
      h="full"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      transition=".25s ease"
      {...rest}
      overflow="clip"
    >
      <Flex
        align="center"
        justify="space-between"
        h="20"
        ml="4"
        cursor="pointer"
      >
        <Link href="/" passHref>
          <HStack>
            <Image boxSize="26px" shadow="md" alt="logo" src={logo.src} />
            <Text
              fontSize="18px"
              fontWeight="extrabold"
              wordBreak="keep-all"
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
          p="2"
          fontSize="sm"
          borderRadius="xl"
          label="Global Dashboard"
          placement="right"
        >
          <Box>
            <Link href="/" passHref>
              <a>
                <NavItem
                  height="3rem"
                  shadow={router.pathname === "/" && "md"}
                  icon={FiTrendingUp}
                  bg={
                    router.pathname === "/" && // eslint-disable-next-line
                    useColorModeValue("gray.200", "gray.700")
                  }
                >
                  <Text as={router.pathname === "/" && "u"} fontSize="lg">
                    Global
                  </Text>
                </NavItem>
              </a>
            </Link>
          </Box>
        </Tooltip>
        <Tooltip
          p="2"
          fontSize="sm"
          borderRadius="xl"
          label="Users"
          placement="right"
        >
          <Box ml={sidebarOpen && "4"}>
            <Link href="/users" passHref>
              <a>
                <NavItem
                  height="3rem"
                  shadow={router.pathname === "/users" && "md"}
                  icon={FiUsers}
                  bg={
                    router.pathname === "/users" && // eslint-disable-next-line
                    useColorModeValue("gray.200", "gray.700")
                  }
                >
                  <Text as={router.pathname === "/users" && "u"} fontSize="lg">
                    Users
                  </Text>
                </NavItem>
              </a>
            </Link>
          </Box>
        </Tooltip>
        <Tooltip
          p="2"
          fontSize="sm"
          borderRadius="xl"
          label="Scenes"
          placement="right"
        >
          <Box ml={sidebarOpen && "4"}>
            <Link href="/scenes" passHref>
              <a>
                <NavItem
                  shadow={router.pathname === "/scenes" && "md"}
                  height="3rem"
                  icon={FiMapPin}
                  bg={
                    router.pathname === "/scenes" && // eslint-disable-next-line
                    useColorModeValue("gray.200", "gray.700")
                  }
                >
                  <Text as={router.pathname === "/scenes" && "u"} fontSize="lg">
                    Scenes
                  </Text>
                </NavItem>
              </a>
            </Link>
          </Box>
        </Tooltip>
        <Tooltip
          p="2"
          fontSize="sm"
          borderRadius="xl"
          label="Parcels"
          placement="right"
        >
          <Box ml={sidebarOpen && "4"}>
            <Link href="/parcels" passHref>
              <a>
                <NavItem
                  shadow={router.pathname === "/parcels" && "md"}
                  height="3rem"
                  icon={FiPackage}
                  bg={
                    router.pathname === "/parcels" && // eslint-disable-next-line
                    useColorModeValue("gray.200", "gray.700")
                  }
                >
                  <Text
                    as={router.pathname === "/parcels" && "u"}
                    fontSize="lg"
                  >
                    Parcels
                  </Text>
                </NavItem>
              </a>
            </Link>
          </Box>
        </Tooltip>
        <Tooltip
          p="2"
          fontSize="sm"
          borderRadius="xl"
          label="Roadmap"
          placement="right"
        >
          <Box>
            <Link href="/roadmap" passHref>
              <a>
                <NavItem
                  shadow={router.pathname === "/roadmap" && "md"}
                  height="3rem"
                  icon={FiMap}
                  bg={
                    router.pathname === "/roadmap" &&
                    // eslint-disable-next-line
                    useColorModeValue("gray.200", "gray.700")
                  }
                >
                  <Text
                    as={router.pathname === "/roadmap" && "u"}
                    fontSize="lg"
                  >
                    Roadmap
                  </Text>
                </NavItem>
              </a>
            </Link>
          </Box>
        </Tooltip>
        <Tooltip
          p="2"
          fontSize="sm"
          borderRadius="xl"
          label="About"
          placement="right"
        >
          <Box>
            <Link href="/about" passHref>
              <a>
                <NavItem
                  shadow={router.pathname === "/about" && "md"}
                  height="3rem"
                  icon={FiCompass}
                  bg={
                    router.pathname === "/about" &&
                    // eslint-disable-next-line
                    useColorModeValue("gray.200", "gray.700")
                  }
                >
                  <Text as={router.pathname === "/about" && "u"} fontSize="lg">
                    About
                  </Text>
                </NavItem>
              </a>
            </Link>
          </Box>
        </Tooltip>
        <Spacer />
        <Tooltip
          p="2"
          fontSize="sm"
          borderRadius="xl"
          label={sidebarOpen ? "Collapse" : "Expand"}
          placement="right"
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

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ sidebarStatus, onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      // NOTE
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
