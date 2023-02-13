import {
  Box,
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
      {posts.map((post) => (
        <Box
          key={post.slug}
          display={post.data.published === false && "none"}
          mb="4"
          borderRadius="xl"
        >
          <Link href={`/blog/` + post.slug}>
            <BoxWrapper colSpan={6}>
              <Flex direction="column" mx="4">
                <Flex my="4">
                  <Box w={["70%", "85%"]}>
                    <Text
                      fontSize={["lg", "xl", "2xl", "3xl"]}
                      fontWeight="bold"
                      noOfLines={1}
                    >
                      {post.data.title}
                    </Text>
                  </Box>
                  <Spacer />
                  <Center h="auto">
                    <Text wordBreak="keep-all">{post.data.date}</Text>
                  </Center>
                </Flex>
                <Box
                  pos="relative"
                  overflow="clip"
                  h={[200, 400, 500]}
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
              <Box m="4" ml="6">
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
