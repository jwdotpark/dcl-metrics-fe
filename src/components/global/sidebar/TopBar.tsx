// @ts-nocheck
import {
  Text,
  Box,
  FlexProps,
  Flex,
  useColorModeValue,
  IconButton,
  HStack,
  Spacer,
  Button,
} from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import Image from "next/image"
import { FiMenu } from "react-icons/fi"
import { psaAtom } from "../../../lib/state/psaState"
import ColorButton from "../ColorButton"
import FeedbackButton from "../FeedbackButton"
import LogOutButton from "../LogOutButton"
import PrivateDashboardButton from "../PrivateDashboardButton"
import SettingsButton from "../SettingsButton"
import Link from "next/link"
import { FiCoffee } from "react-icons/fi"
import { useRouter } from "next/router"

interface MobileProps extends FlexProps {
  sidebarStatus: string
  onOpen: () => void
}

const TopBar = ({ sidebarStatus, onOpen, ...rest }: MobileProps) => {
  const router = useRouter()
  const auth = JSON.parse(localStorage.getItem("auth"))
  const psa = useAtomValue(psaAtom)
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
          <Box shadow="md">
            <Image width="26" height="26" alt="logo" src={"/images/logo.png"} />
          </Box>
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
      <Box display={["none", "block"]} ml="2">
        <Box
          sx={{ transform: "translateY(3px)" }}
          display="inline-block"
          mr="2"
        >
          <FiCoffee color={useColorModeValue("black", "white")} />
        </Box>
        <Box display="inline-block">
          <Link href={`/blog/${psa?.slug}`} target="_blank">
            <Text>
              <Button size="sm" variant="link">
                <Text color={useColorModeValue("#000", "#fff")}>
                  {psa?.data?.description}
                </Text>
              </Button>
            </Text>
          </Link>
        </Box>
      </Box>
      <Spacer />
      <HStack spacing={[-4, -1, 0, 1, 2]}>
        {auth && (
          <>
            <PrivateDashboardButton />
            <LogOutButton />
          </>
        )}
        {/* insert item */}
        <Spacer />
        {router.pathname === "/" && <SettingsButton />}
        <FeedbackButton />
        <ColorButton />
      </HStack>
    </Flex>
  )
}

export default TopBar
