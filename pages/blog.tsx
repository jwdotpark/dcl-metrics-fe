import { Box, Center } from "@chakra-ui/react"
import { getPosts } from "../blog/helpers/post"
import Layout from "../src/components/layout/layout"
import PostList from "../src/components/blog/PostList"

export const getStaticProps = () => {
  const posts = getPosts()
  return {
    props: {
      posts,
    },
  }
}

const BlogPage = ({ posts }) => {
  return (
    <Layout>
      <Center w="100%">
        <PostList posts={posts} />
      </Center>
    </Layout>
  )
}

export default BlogPage
