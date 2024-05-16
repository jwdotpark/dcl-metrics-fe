import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react"
import { MDXRemote } from "next-mdx-remote"
import { getPost, getPosts } from "../../markdown/helpers/post"
import { serialize } from "next-mdx-remote/serialize"
import Layout from "../../src/components/layout/layout"
import BoxWrapper from "../../src/components/layout/local/BoxWrapper"
import { useRouter } from "next/router"
import externalLinks from "remark-external-links"
import smartypants from "remark-smartypants"
import remarkGfm from "remark-gfm"
import { format } from "date-fns"
import { CallOut, MDYoutube, LinkButton } from "../../src/components/markdown"
import { generateMetaData, siteUrl } from "../../src/lib/data/metadata"
import { NextSeo } from "next-seo"

function Post({ slug, data, content }) {
  const router = useRouter()

  const pageTitle = `DCL-Metrics ${data.title}`
  const description = `${data.author} posted an article on ${format(
    new Date(data.date),
    "MMMM d"
  )}`

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: data.previewImage,
  })

  return (
    <>
      <NextSeo
        title={metaData.title}
        description={metaData.description}
        openGraph={{
          url: siteUrl + "/blog/" + slug,
          title: metaData.title,
          description: metaData.description,
          images: [
            {
              url: metaData.image,
              width: 400,
              height: 400,
              alt: metaData.description,
              type: "image/png",
            },
          ],
          siteName: "DCL-Metrics",
        }}
      />
      <Layout>
        <Center>
          <Center w={["100%", "100%", "100%", 1080]}>
            <BoxWrapper colSpan={6}>
              <Box>
                <Box w="100%">
                  <Center mt="8" mx="4">
                    <Text
                      mb="2"
                      fontSize={["xl", "xl", "2xl", "3xl"]}
                      fontWeight="bold"
                    >
                      {data.title}
                    </Text>
                  </Center>
                  <Flex w="100%" mt="4">
                    <Center w="100%">
                      <Flex direction="column" fontSize="sm">
                        <Center>
                          <Text>{data.author}</Text>
                        </Center>
                        <Center>
                          <Text>
                            {format(new Date(data.date), "MMMM d, yyyy")}
                          </Text>
                        </Center>
                      </Flex>
                    </Center>
                  </Flex>

                  <Flex>
                    <Spacer />
                  </Flex>
                </Box>

                <Box className="markdown" m="4" mb="8" mx={[4, 8]}>
                  <MDXRemote
                    {...content}
                    components={{
                      CallOut,
                      MDYoutube,
                      LinkButton,
                    }}
                  />
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
    </>
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
  const slug = params.slug
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
      slug: slug,
    },
  }
}
