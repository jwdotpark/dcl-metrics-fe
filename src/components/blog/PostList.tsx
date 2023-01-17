import { Box, Flex, Spacer, Text } from "@chakra-ui/react"
import Link from "next/link"
import BoxWrapper from "../../components/layout/local/BoxWrapper"

const PostList = ({ posts }) => {
  console.log(posts)
  return (
    <Box>
      <Link href="/">
        {posts
          .slice(0)
          .reverse()
          .map((post) => (
            <Box key={post.slug} mb="4">
              <BoxWrapper>
                <Flex mx="4" dir="row">
                  <Box>
                    <Text fontSize={["lg", "xl", "2xl", "3xl"]} noOfLines={1}>
                      {post.data.title}
                    </Text>
                  </Box>
                  <Spacer />
                  <Box>
                    <Text m="2" fontStyle="italic" noOfLines={1}>
                      {post.data.date}
                    </Text>
                  </Box>
                </Flex>
                <Box m="4">
                  <Text noOfLines={1}>{post.data.description}</Text>
                </Box>
              </BoxWrapper>
            </Box>
          ))}
      </Link>
    </Box>
  )
}

export default PostList
