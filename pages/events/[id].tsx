import { Center, Grid, useBreakpointValue } from "@chakra-ui/react"
import { NextSeo } from "next-seo"
import Layout from "../../src/components/layout/layout"
import { Attendees } from "../../src/components/local/events/event/Attendees"
import { Description } from "../../src/components/local/events/event/Description"
import { Details } from "../../src/components/local/events/event/Details"
import { EnrichedData } from "../../src/components/local/events/event/EnrichedData"
import { ImageBox } from "../../src/components/local/events/event/Image"
import { Title } from "../../src/components/local/events/event/Title"
import { getEndpoint } from "../../src/lib/data/constant"
import { getDataWithApiKey } from "../../src/lib/data/fetch"
import { generateMetaData, siteUrl } from "../../src/lib/data/metadata"

export async function getServerSideProps(context) {
  const { id } = context.params
  const url = `https://events.decentraland.org/api/events/${id}`
  const res = await fetch(url)
  const data = await res.json()

  const eventUrl = getEndpoint(`events/${id}`)
  const eventData = await getDataWithApiKey(eventUrl, `events/${id}`, {})

  const { scene_uuid, date } = eventData
  const sceneUrl = getEndpoint(`scenes/${scene_uuid}?date=${date}`)
  const sceneData = await getDataWithApiKey(
    sceneUrl,
    `/scenes/${scene_uuid}`,
    {}
  )

  const attendeeUrl = `https://events.decentraland.org/api/events/${id}/attendees`
  const attendeeData = await fetch(attendeeUrl)
  const attendees = await attendeeData.json()

  if (data.ok && eventData && sceneData) {
    return {
      props: { data, eventData, sceneData, attendees },
    }
  } else {
    return {
      props: {},
    }
  }
}

const SingleEventPage = (props) => {
  if (!props.data) {
    return (
      <Layout>
        <Center h="calc(100vh - 8rem)">Event not found</Center>
      </Layout>
    )
  }

  const { data, eventData, sceneData, attendees } = props

  const pageTitle = `Decentraland Events - ${data.data && data.data.name}`
  const description = data.data && data.data.description
  const image = data.data && data.data.image

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const gridColumn = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 8,
  })

  const event = data.data

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
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="0">
          <Title event={event} />
          <ImageBox event={event} />
          <Details event={event} />
          <EnrichedData
            event={event}
            eventData={eventData}
            sceneData={sceneData}
          />
          <Description event={event} />
          <Attendees attendees={attendees} />
        </Grid>
      </Layout>
    </>
  )
}

export default SingleEventPage
