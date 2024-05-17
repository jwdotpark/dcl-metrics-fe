/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import {
  Box,
  useColorModeValue,
  Flex,
  HStack,
  CloseButton,
  Spacer,
  Text,
  BoxProps,
  Center,
} from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { sidebarList } from "../sidebarList"
import NavItem from "./NavItem"
import ToolTip from "../../layout/local/ToolTip"
import { capitalize, isMobile, isServer } from "../../../lib/hooks/utils"

interface SidebarProps extends BoxProps {
  onClose: () => void
  sidebarOpen?: boolean
  setSidebarOpen?: (value: boolean) => void
  sidebarStatus?: string
  handleSidebar?: () => void
  isOpen?: boolean
}

const SidebarItem = ({ sidebarOpen, label, name, icon, subItem }) => {
  const router = useRouter()

  const setItemName = (name: string) => {
    if (name === "") {
      return "Global"
    } else {
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  }

  return (
    <ToolTip label={!sidebarOpen && isServer() && label}>
      <Box ml={sidebarOpen && subItem && "4"}>
        <Box
          onClick={() => {
            router.prefetch(`/${name}`)
            router.push(`/${name}`)
          }}
        >
          <NavItem
            height="2.5rem"
            shadow={router.pathname === "/" + name && "md"}
            icon={icon}
            bg={
              router.pathname === "/" + name &&
              useColorModeValue("gray.200", "gray.700")
            }
            overflow="hidden"
            transition="background-color 0.15s easeInOut"
            _hover={{
              bg: useColorModeValue("gray.200", "gray.700"),
            }}
          >
            <Text
              as={router.pathname === "/" + name ? "u" : "a"}
              fontSize="md"
              fontWeight="medium"
            >
              {capitalize(setItemName(name))}
            </Text>
          </NavItem>
        </Box>
      </Box>
    </ToolTip>
  )
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
  return (
    <Box
      pos="fixed"
      w={{ base: "full", md: sidebarStatus }}
      h="full"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.300", "gray.700")}
      shadow="lg"
      transition=".25s ease"
      {...rest}
      zIndex="banner"
      overflow="clip"
      onClick={handleSidebar}
    >
      <Flex
        align="center"
        justify="space-between"
        mt="3"
        mb="5"
        ml="4"
        cursor="pointer"
      >
        <Link href="/" passHref legacyBehavior>
          <HStack>
            <Box shadow="md">
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
      <Flex direction="column" gap="1" h="calc(100vh - 5rem)">
        {Object.keys(sidebarList).map((item) => (
          <SidebarItem
            key={item}
            sidebarOpen={sidebarOpen}
            label={sidebarList[item].label}
            name={sidebarList[item].name}
            icon={sidebarList[item].icon}
            subItem={sidebarList[item].subItem}
          />
        ))}
        <Spacer />
        {!isMobile() && (
          <Link href="https://decentraland.org/dao/" target="_blank">
            <Center sx={{ transform: "translateY(20px)" }}>
              <Image
                alt="DAO logo"
                src={useColorModeValue(
                  "/DAO_logo_light.png",
                  "/DAO_logo_dark.png"
                )}
                width="100"
                height="100"
              />
            </Center>
          </Link>
        )}
      </Flex>
    </Box>
  )
}

export default SidebarContent
