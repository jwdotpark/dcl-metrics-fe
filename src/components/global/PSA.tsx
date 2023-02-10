import {
  Center,
  Spacer,
  Flex,
  Button,
  Box,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react"
import { FiCoffee } from "react-icons/fi"
import { AiFillCloseCircle } from "react-icons/ai"
import moment from "moment"

const PSA = ({ setIsPSAVisible, latestPost }) => {
  const { description } = latestPost.data
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
            <Box display="inline-block" mr="2">
              <Box display="inline"></Box>
              <Text>
                <Box
                  sx={{ transform: "translateY(2px)" }}
                  display="inline-block"
                  mr="2"
                >
                  <FiCoffee color={useColorModeValue("black", "white")} />
                </Box>
                <Link href={`/blog/${latestPost.slug}`}>{description}</Link>
              </Text>
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
