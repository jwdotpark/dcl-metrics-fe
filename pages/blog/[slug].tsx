import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react"
import { MDXRemote } from "next-mdx-remote"
import { getPost, getPosts } from "../../blog/helpers/post"
import { serialize } from "next-mdx-remote/serialize"
import Layout from "../../src/components/layout/layout"
import BoxWrapper from "../../src/components/layout/local/BoxWrapper"
import { useRouter } from "next/router"
import externalLinks from "remark-external-links"
import smartypants from "remark-smartypants"
import remarkGfm from "remark-gfm"

function Post({ data, content }) {
  const router = useRouter()
  return (
    <Layout>
      <Center>
        <Center w={["100%", "100%", "100%", 1080]}>
          <BoxWrapper colSpan={6}>
            <Box>
              <Flex m="4" mb="8">
                <Box w={["70%", "85%"]}>
                  <Text fontSize={["lg", "xl", "2xl", "3xl"]} fontWeight="bold">
                    {data.title}
                  </Text>
                </Box>
                <Spacer />
                <Center h="auto">
                  <Text wordBreak="keep-all">{data.date}</Text>
                </Center>
              </Flex>

              <Box m="4" mx="8">
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
        </Center>
      </Center>
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
  const mdxSource = await serialize(post.content, {
    scope: post.data,
    mdxOptions: {
      remarkPlugins: [
        [externalLinks, { target: "_blank" }],
        smartypants,
        remarkGfm,
      ],
      rehypePlugins: [],
      format: "mdx",
    },
  })

  return {
    props: {
      data: post.data,
      content: mdxSource,
    },
  }
}
