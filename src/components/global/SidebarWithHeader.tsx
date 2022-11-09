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
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react"
import { FiMenu, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi"
import { IconType } from "react-icons"
import { ReactText } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import logo from "../../../public/images/logo.png"
import { sidebarList } from "./sidebarList"
import ColorButton from "./ColorButton"
import PrivateDashboardButton from "./PrivateDashboardButton"

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
        w={["100%", "100%", `calc(100% - ${sidebarStatus})`]}
        ml={{ base: 0, md: sidebarStatus }}
      >
        <Box w="100%" maxW="1920px" p="4" data-testid="sidebar">
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

  const SidebarItem = ({ label, name, icon, subItem }) => {
    return (
      <Tooltip
        p="2"
        fontSize="sm"
        borderRadius="xl"
        label={label}
        placement="right"
      >
        <Box ml={sidebarOpen && subItem && "4"}>
          <Link href={"/" + name} passHref>
            <a>
              <NavItem
                height="3rem"
                shadow={router.pathname === "/" + name && "md"}
                icon={icon}
                bg={
                  router.pathname === "/" + name && // eslint-disable-next-line
                  useColorModeValue("gray.200", "gray.700")
                }
                overflow="hidden"
              >
                <Text as={router.pathname === "/" + name && "u"} fontSize="lg">
                  {/* if name is dashboard, replace it with 'Private' */}
                  {name
                    ? name.charAt(0).toUpperCase() + name.slice(1)
                    : "Global"}
                </Text>
              </NavItem>
            </a>
          </Link>
        </Box>
      </Tooltip>
    )
  }

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
        {Object.keys(sidebarList).map((item) => (
          <SidebarItem
            key={item}
            label={sidebarList[item].label}
            name={sidebarList[item].name}
            icon={sidebarList[item].icon}
            subItem={sidebarList[item].subItem}
          />
        ))}
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
              overflow="hidden"
            >
              <Text fontSize="xl">Collapse</Text>
            </NavItem>
          </Box>
        </Tooltip>
      </Flex>
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
  const auth = JSON.parse(localStorage.getItem("auth"))
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
        {auth && <PrivateDashboardButton />}
        <ColorButton />
      </HStack>
    </Flex>
  )
}
