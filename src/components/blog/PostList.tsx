import {
  Box,
  //Center,
  Image,
  Flex,
  Spacer,
  Text,
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
              <Flex direction="column" m="4">
                <Flex direction={["column", "row"]} my="4">
                  <Box w={["100%", "100%"]} pr="4">
                    <Text
                      ml="4"
                      fontSize={["lg", "xl", "2xl", "3xl"]}
                      fontWeight="bold"
                    >
                      {post.data.title}
                    </Text>
                  </Box>
                  <Spacer />
                  {/*<Box h="auto">
                    <Text fontSize="xs" wordBreak="keep-all">
                      {post.data.date}
                    </Text>
                  </Box>*/}
                </Flex>
                {post.data.previewImage.length > 0 && (
                  <Image
                    pos="relative"
                    overflow="clip"
                    h={[200, 400, 500]}
                    mx="4"
                    my="2"
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
