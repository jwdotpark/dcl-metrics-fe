import { Center } from "@chakra-ui/react"
import { getPosts } from "../../markdown/helpers/post"
import Layout from "../../src/components/layout/layout"
import PostList from "../../src/components/blog/PostList"
import moment from "moment"
import { generateMetaData } from "../../src/lib/data/metadata"
import Head from "next/head"

export const getStaticProps = () => {
  const posts = getPosts()

  posts.sort((a, b) => {
    return moment(b.data.date).unix() - moment(a.data.date).unix()
  })

  return {
    props: {
      posts,
    },
  }
}

const BlogPage = ({ posts }) => {
  const pageTitle = "DCL-Metrics Blog"
  const description =
    "Your hub for insightful articles, guides, and updates on the latest happenings in the DCL-Metrics."
  const image = "/images/blog.png"

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  return (
    <Layout>
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.image} />
      </Head>
      <Center w="100%">
        <PostList posts={posts} />
      </Center>
    </Layout>
  )
}

export default BlogPage
