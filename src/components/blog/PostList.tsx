import { Box, Center, Image, Flex, Spacer, Text } from "@chakra-ui/react"
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
                      ml="4"
                      fontSize={["lg", "xl", "2xl", "3xl"]}
                      fontWeight="bold"
                      //noOfLines={1}
                    >
                      {post.data.title}
                    </Text>
                  </Box>
                  <Spacer />
                  <Center h="auto">
                    <Text
                      fontSize={["xs", "xs", "xs", "xs", "md"]}
                      wordBreak="keep-all"
                    >
                      {post.data.date}
                    </Text>
                  </Center>
                </Flex>
                {post.data.previewImage.length > 0 && (
                  <Image
                    pos="relative"
                    overflow="clip"
                    h={[200, 400, 500]}
                    mb="6"
                    mx="4"
                    borderRadius="xl"
                    objectFit="cover"
                    alt={`${post.data.title} preview picture`}
                    src={post.data.previewImage}
                  />
                )}
                <Spacer />
              </Flex>
              <Box mb="4" mx="8">
                <Text>{post.data.description}</Text>
              </Box>
            </BoxWrapper>
          </Link>
        </Box>
      ))}
    </Box>
  )
}

export default PostList
