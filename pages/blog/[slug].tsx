import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { MDXRemote } from "next-mdx-remote"
import { getPost, getPosts } from "../../blog/helpers/post"
import { serialize } from "next-mdx-remote/serialize"
import Layout from "../../src/components/layout/layout"
import BoxWrapper from "../../src/components/layout/local/BoxWrapper"
import { useRouter } from "next/router"
import externalLinks from "remark-external-links"
import smartypants from "remark-smartypants"
import remarkGfm from "remark-gfm"
import moment from "moment"

function Post({ data, content }) {
  const router = useRouter()
  return (
    <Layout>
      <Center>
        <Center w={["100%", "100%", "100%", 1080]}>
          <BoxWrapper colSpan={6}>
            <Box>
              <Flex m="4" mb="8" mx="8">
                <Box>
                  <Text
                    mb="2"
                    fontSize={["lg", "xl", "2xl", "3xl"]}
                    fontWeight="bold"
                  >
                    {data.title}
                  </Text>
                  <Text>{data.author}</Text>
                  <Text mb="4">{moment(data.date).format("MMMM D, YYYY")}</Text>
                  <Flex>
                    <Spacer />
                  </Flex>
                </Box>
              </Flex>

              <Box className="markdown" m="4" mb="8" mx="8">
                <MDXRemote {...content} />
              </Box>
              <Flex m="4">
                <Spacer />
                <Button
                  borderRadius="xl"
                  shadow="md"
                  onClick={() => {
                    router.push("/blog")
                  }}
                >
                  To article list
                </Button>
              </Flex>
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
