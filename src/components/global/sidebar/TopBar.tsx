/* eslint-disable react-hooks/rules-of-hooks */
import {
  Text,
  Box,
  Flex,
  useColorModeValue,
  IconButton,
  HStack,
  Spacer,
  Button,
  Center,
} from "@chakra-ui/react"
import { FiMenu } from "react-icons/fi"
import ColorButton from "../ColorButton"
import FeedbackButton from "../FeedbackButton"
import Link from "next/link"
import { isMobile } from "../../../lib/hooks/utils"
import ProfilingButton from "../ProfilingButton"

const TopBar = ({ psa, sidebarStatus, onOpen, ...rest }: any) => {
  return (
    <Flex
      align="center"
      justify={{ base: "space-between", md: "flex-end" }}
      h="12"
      ml={{ base: 0, md: sidebarStatus }}
      px={{ base: 4, md: 4 }}
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      shadow="md"
      transition=".25s ease"
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="open menu"
        icon={<FiMenu />}
        onClick={onOpen}
        size="sm"
        variant="outline"
      />
      <Box
        display={{ base: "flex", md: "none" }}
        fontFamily="sans-serif"
        fontSize="2xl"
        fontWeight="bold"
      >
        <HStack>
          <Box ml={[2, 0]} shadow="md">
            {/*<Image width="26" height="26" alt="logo" src={"/images/logo.png"} />*/}
          </Box>
          <Text
            display="none"
            fontSize="20px"
            fontWeight="extrabold"
            css={{ transform: "translateY(-1px)" }}
            data-testid="title"
          >
            DCL Metrics
          </Text>
        </HStack>
      </Box>
      <Box display={"block"}>
        <Box display="inline-block">
          <Link href={`/blog/${psa?.slug}`} target="_blank">
            <Text>
              <Button variant="link">
                <Text ml="2" color={useColorModeValue("#000", "#fff")}>
                  {isMobile()
                    ? psa?.data?.description.slice(0, 30) + ".."
                    : psa?.data?.description}
                </Text>
              </Button>
            </Text>
          </Link>
        </Box>
      </Box>

      <Spacer />
      <Center>
        {process.env.NEXT_PUBLIC_INSPECTOR === "true" && <ProfilingButton />}
        <FeedbackButton />
        <ColorButton />
      </Center>
    </Flex>
  )
}

export default TopBar
