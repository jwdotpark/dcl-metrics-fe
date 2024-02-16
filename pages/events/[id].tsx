import {
  Box,
  Text,
  Flex,
  Grid,
  Image,
  useBreakpointValue,
  Center,
  Divider,
} from "@chakra-ui/react"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import { format } from "date-fns"
import { NextSeo } from "next-seo"
import Link from "next/link"
import { FiAtSign, FiCalendar } from "react-icons/fi"
import ReactMarkdown from "react-markdown"
import Layout from "../../src/components/layout/layout"
import BoxWrapper from "../../src/components/layout/local/BoxWrapper"
import ToolTip from "../../src/components/layout/local/ToolTip"
import { Description } from "../../src/components/local/events/event/Description"
import { ImageBox } from "../../src/components/local/events/event/Image"
import { Title } from "../../src/components/local/events/event/Title"
import { generateMetaData, siteUrl } from "../../src/lib/data/metadata"

export async function getServerSideProps(context) {
  const { id } = context.params
  const url = `https://events.decentraland.org/api/events/${id}`
  const res = await fetch(url)
  const data = await res.json()

  if (data.ok) {
    return {
      props: { data },
    }
  } else {
    return {
      props: { data: {} },
    }
  }
}

const SingleEventPage = (props) => {
  const { data } = props

  const pageTitle = `Decentraland Events - ${data.data.name}`
  const description = data.data.description
  const image = data.data.image

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  const gridColumn = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 6,
  })

  const event = data.data

  console.log(event)

  return (
    <>
      <NextSeo
        title={metaData.title}
        description={metaData.description}
        openGraph={{
          url: siteUrl + "/events",
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
        }}
      />
      <Layout>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <Title event={event} />
          <ImageBox event={event} />
          <Description event={event} />
          {/* TODO */}
          {/*<BoxWrapper colSpan="6">
            <Box p="2">details</Box>
          </BoxWrapper>
          <BoxWrapper colSpan={[4, 4, 4, 4, 4]}>
            <Box p="2">chart</Box>
          </BoxWrapper>
          <BoxWrapper colSpan={[4, 4, 4, 4, 2]}>
            <Box p="2">stat box</Box>
          </BoxWrapper>*/}
        </Grid>
      </Layout>
    </>
  )
}

export default SingleEventPage
