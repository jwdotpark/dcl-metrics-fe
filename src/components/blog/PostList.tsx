import {
  Box,
  Button,
  Center,
  Image,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Link from "next/link"
import BoxWrapper from "../../components/layout/local/BoxWrapper"

const PostList = ({ posts }) => {
  return (
    <Box w={["100%", "100%", "100%", 1080]}>
      {posts
        .slice(0)
        .reverse()
        .map((post) => (
          <Box key={post.slug} mb="4" borderRadius="xl">
            <Link href={`/blog/` + post.slug}>
              <BoxWrapper colSpan={6}>
                <Flex direction="column" mx="4">
                  <Flex my="4">
                    <Box>
                      <Text fontSize={["lg", "xl", "2xl", "3xl"]} noOfLines={1}>
                        {post.data.title}
                      </Text>
                    </Box>
                    <Spacer />
                    <Center h="auto">
                      <Text>{post.data.date}</Text>
                    </Center>
                  </Flex>
                  <Box
                    pos="relative"
                    overflow="clip"
                    h="400px"
                    border="1px solid"
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                    borderRadius="xl"
                    shadow="md"
                  >
                    <Image
                      objectFit="cover"
                      alt={`${post.data.title} preview picture`}
                      src={post.data.previewImage}
                    />
                  </Box>
                  <Spacer />
                </Flex>
                <Box m="4">
                  <Text noOfLines={1}>{post.data.description}</Text>
                </Box>
              </BoxWrapper>
            </Link>
          </Box>
        ))}
    </Box>
  )
}

export default PostList
