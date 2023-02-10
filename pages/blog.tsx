import { Center } from "@chakra-ui/react"
import { getPosts } from "../blog/helpers/post"
import Layout from "../src/components/layout/layout"
import PostList from "../src/components/blog/PostList"
import moment from "moment"

export const getStaticProps = () => {
  const posts = getPosts()

  posts
    .sort((a, b) => {
      return moment(b.data.date).unix() - moment(a.data.date).unix()
    })
    .reverse()

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
