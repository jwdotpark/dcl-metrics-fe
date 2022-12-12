import {
  Center,
  Spacer,
  Flex,
  Button,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import GridBox from "../local/GridBox"
import { FiCoffee, FiLogOut } from "react-icons/fi"
import Link from "next/link"

const PSA = ({ setIsPSAVisible }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("green.200", "green.800"),
  }
  return (
    <GridBox box={box}>
      <Box px="4" py="2">
        <Flex dir="row">
          <Center>
            <Text color={useColorModeValue("black", "white")}>
              <Box
                sx={{ transform: "translateY(2px)" }}
                display="inline-block"
                mr="2"
              >
                <FiCoffee color={useColorModeValue("black", "white")} />
              </Box>
              Land picker is added.{" "}
              <Box display="inline-block">
                <Link href="/map">
                  <Text
                    color="blue.600"
                    _hover={{ color: "blue", cursor: "pointer" }}
                  >
                    Try out new scene map!
                  </Text>
                </Link>
              </Box>
            </Text>
          </Center>
          <Spacer />
          <Box>
            <Button
              borderRadius="xl"
              onClick={() => setIsPSAVisible(false)}
              size="sm"
              variant="ghost"
            >
              <FiLogOut color={useColorModeValue("black", "white")} />
            </Button>
          </Box>
        </Flex>
      </Box>
    </GridBox>
  )
}

export default PSA
