import {
  Box,
  useColorModeValue,
  Flex,
  HStack,
  CloseButton,
  Spacer,
  Text,
  BoxProps,
} from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi"
import { sidebarList } from "../sidebarList"
import NavItem from "./NavItem"
import ToolTip from "../../layout/local/ToolTip"

interface SidebarProps extends BoxProps {
  onClose: () => void
  sidebarOpen: boolean
  setSidebarOpen: () => void
  sidebarStatus: string
  handleSidebar: () => void
  isOpen: boolean
}

const SidebarContent = ({
  sidebarOpen,
  //setSidebarOpen,
  sidebarStatus,
  handleSidebar,
  //isOpen,
  onClose,
  ...rest
}: SidebarProps) => {
  const router = useRouter()

  const SidebarItem = ({ label, name, icon, subItem }) => {
    const setItemName = (name: string) => {
      if (name === "") {
        return "Global"
      } else if (name === "api-docs") {
        return "API"
      } else {
        return name.charAt(0).toUpperCase() + name.slice(1)
      }
    }

    const isMobile = () => {
      if (typeof window !== "undefined") {
        return window.innerWidth < 768
      }
    }

    return (
      <ToolTip label={!sidebarOpen && !isMobile() && label}>
        <Box ml={sidebarOpen && subItem && "4"}>
          <Link href={"/" + name} passHref legacyBehavior>
            <a>
              <NavItem
                height="3rem"
                shadow={router.pathname === "/" + name && "md"}
                icon={icon}
                bg={
                  router.pathname === "/" + name &&
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  useColorModeValue("gray.200", "gray.700")
                }
                overflow="hidden"
                transition="background-color 0.25s ease"
                _hover={{
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
              >
                <Text
                  as={router.pathname === "/" + name ? "u" : "a"}
                  fontSize="md"
                  fontWeight="medium"
                >
                  {isMobile() &&
                    setItemName(name).slice(0, 1).toUpperCase() +
                      setItemName(name).slice(1)}
                  {sidebarOpen && setItemName(name)}
                </Text>
              </NavItem>
            </a>
          </Link>
        </Box>
      </ToolTip>
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
        <Link href="/" passHref legacyBehavior>
          <HStack>
            <Box sx={{ transform: "translateY(-3px)" }} shadow="md">
              <Image
                width="26"
                height="26"
                alt="logo"
                src={"/images/logo.png"}
              />
            </Box>
            <Text
              fontSize="18px"
              fontWeight="bold"
              wordBreak="keep-all"
              css={{ transform: "translateY(-1px)" }}
              data-testid="sidebar-title"
            >
              {sidebarOpen && "DCL Metrics"}
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
        <ToolTip label={sidebarOpen ? "Collapse" : "Expand"}>
          <Box display={{ base: "none", md: "block" }}>
            <NavItem
              height="3rem"
              icon={sidebarOpen ? FiArrowLeftCircle : FiArrowRightCircle}
              onClick={handleSidebar}
              overflow="hidden"
            >
              <Text>Collapse</Text>
            </NavItem>
          </Box>
        </ToolTip>
      </Flex>
    </Box>
  )
}

export default SidebarContent
