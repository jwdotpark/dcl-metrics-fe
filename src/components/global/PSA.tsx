import {
  Center,
  Spacer,
  Flex,
  Button,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { FiCoffee } from "react-icons/fi"
import { AiFillCloseCircle } from "react-icons/ai"
import Link from "next/link"

const PSA = ({ setIsPSAVisible }) => {
  return (
    <Box
      mb="4"
      px="4"
      py="2"
      bg={useColorModeValue("green.300", "green.700")}
      border="2px solid"
      borderColor={useColorModeValue("green.300", "green.700")}
      borderRadius="xl"
    >
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
            We&lsquo;ve added a LAND sales & Rentals chart. Check it out!
            {/*<Box display="inline-block">
              <Link href="/map">
                <Text
                  color={useColorModeValue("blue.600", "blue.200")}
                  _hover={{ color: "blue", cursor: "pointer" }}
                >
                  try it out on the new scene map!
                </Text>
              </Link>
            </Box>*/}
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
            <AiFillCloseCircle
              color={useColorModeValue("black", "white")}
              size="20"
            />
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default PSA
