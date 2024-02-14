import Layout from "../../src/components/layout/layout"
import { generateMetaData, siteUrl } from "../../src/lib/data/metadata"
import { NextSeo } from "next-seo"
import EventBox from "../../src/components/local/events/EventBox"
import EventFilter from "../../src/components/local/events/EventFilter"
import { Box } from "@chakra-ui/react"

export async function getServerSideProps() {
  const url = "https://events.decentraland.org/api/events"
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

const Events = (props) => {
  const pageTitle = "DCL-Metrics Events Data"
  const description =
    "A list of Worlds currently deployed to Decentraland servers."
  const image = `${siteUrl}/images/status.png`

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  const { data } = props

  return (
    <>
      <NextSeo
        title={metaData.title}
        description={metaData.description}
        openGraph={{
          url: siteUrl + "/world",
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
        <EventFilter />
        <Box mb="4" />
        <EventBox data={data.data} />
      </Layout>
    </>
  )
}

export default Events
