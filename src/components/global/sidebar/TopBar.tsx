/* eslint-disable react-hooks/rules-of-hooks */
import {
  Text,
  Box,
  Flex,
  useColorModeValue,
  IconButton,
  HStack,
  Spacer,
  Center,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FiMenu } from "react-icons/fi"
import ColorButton from "../ColorButton"
import FeedbackButton from "../FeedbackButton"
import ProfilingButton from "../ProfilingButton"
import { ResetButton } from "../ResetButton"
import SurveyButton from "../SurveyButton"
import { TopbarLinks } from "./TopBarLinks"

const TopBar = ({ onOpen, ...rest }: any) => {
  const router = useRouter()
  return (
    <Flex
      pos="fixed"
      zIndex="banner"
      top="0"
      right="0"
      left="0"
      align="center"
      justify={{ base: "space-between", md: "flex-end" }}
      w="100vw"
      h="12"
      px={{ base: 4, md: 4 }}
      bg={useColorModeValue("#fafafa90", "#27272a50")}
      shadow="lg"
      transition=".25s ease"
      backdropFilter="blur(10px)"
      {...rest}
    >
      <Box
        display={{ base: "flex", md: "none" }}
        fontFamily="sans-serif"
        fontSize="2xl"
        fontWeight="bold"
      >
        <HStack>
          {/*<Box ml={[2, 0]} shadow="md">
          </Box>*/}
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
      {/*<Box display={"block"}>
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
      </Box>*/}
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="open menu"
        icon={<FiMenu />}
        onClick={onOpen}
        size="sm"
        variant="outline"
      />
      <TopbarLinks />
      <Spacer />
      <Center>
        {process.env.NEXT_PUBLIC_INSPECTOR === "true" && <ProfilingButton />}
        <SurveyButton />
        {router.pathname === "/" && <ResetButton />}
        <FeedbackButton />
        <ColorButton />
      </Center>
    </Flex>
  )
}

export default TopBar
