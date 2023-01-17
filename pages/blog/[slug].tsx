import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react"
import { MDXRemote } from "next-mdx-remote"
import { getPost, getPosts } from "../../blog/helpers/post"
import { serialize } from "next-mdx-remote/serialize"
import Layout from "../../src/components/layout/layout"
import BoxWrapper from "../../src/components/layout/local/BoxWrapper"
import { useRouter } from "next/router"

function Post({ data, content }) {
  const router = useRouter()
  return (
    <Layout>
      <BoxWrapper>
        <Box>
          <Box m="4">
            <Text>{data.title}</Text>
            <Text>{data.date}</Text>
          </Box>
          <Box m="4">
            <MDXRemote {...content} />
          </Box>
          <Box m="4">
            <Button
              w="100%"
              onClick={() => {
                router.push("/blog")
              }}
            >
              Go Back
            </Button>
          </Box>
        </Box>
      </BoxWrapper>
    </Layout>
  )
}

export default Post

export const getStaticPaths = async () => {
  const posts = await getPosts()
  const paths = posts.map((post) => ({ params: { slug: post.slug } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug)
  const mdxSource = await serialize(post.content)
  return {
    props: {
      data: post.data,
      content: mdxSource,
    },
  }
}
