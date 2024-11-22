/* eslint-disable no-unused-vars */
import Layout from "../../src/components/layout/layout"
import { generateMetaData, siteUrl } from "../../src/lib/data/metadata"
import { NextSeo } from "next-seo"
import EventBox from "../../src/components/local/events/EventBox"
import { categoryAtom, filterAtom } from "../../src/lib/state/eventFilter"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { getUniqueCategories } from "../../src/lib/hooks/utils"
import { Box } from "@chakra-ui/react"
import { HighlightedEvents } from "../../src/components/local/events/Highlighted"
import { TrendingEvents } from "../../src/components/local/events/Trending"
import { SearchEvent } from "../../src/components/local/events/event/SearchEvent"
//import { Scheduled } from "../../src/components/local/events/Scheduled"

export async function getServerSideProps() {
  const url = "https://events.decentraland.org/api/events"
  const res = await fetch(url)
  const data = await res.json()

  const scheduleUrl = `https://events.decentraland.org/api/schedules`
  const scheduleRes = await fetch(scheduleUrl)
  const scheduleData = await scheduleRes.json()

  if (data.ok) {
    return {
      props: { data, scheduleData },
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
    "A list of Events currently deployed to Decentraland servers."
  const image = `${siteUrl}/images/status.png`

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  const { data, scheduleData } = props

  const [filteredEvents, setFilteredEvents] = useState([])

  const [selectedFilter, setSelectedFilter] = useAtom(filterAtom)
  const [category, setCategory] = useAtom(categoryAtom)

  const categories = getUniqueCategories(
    data.data.map((event) => event.categories[0])
  )

  const highlighted = data.data.filter((event) => event.highlighted === true)
  const trending = data.data.filter((event) => event.trending === true)

  useEffect(() => {
    const events = data.data
    switch (selectedFilter) {
      case "all":
        setFilteredEvents(events)
        break
      case "oneoff":
        setFilteredEvents(events.filter((event) => !event.recurrent))
        break
      case "regular":
        setFilteredEvents(events.filter((event) => event.recurrent))
        break
      default:
        setFilteredEvents(events)
    }

    if (category !== "") {
      setFilteredEvents(
        events.filter((event) => event.categories[0] === category)
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter, category])

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
        <Box m="4">
          <SearchEvent />
          <Box mb="4" />
          <HighlightedEvents highlighted={highlighted} />
          <Box mb="4" />
          <TrendingEvents trending={trending} />
          <Box mb="4" />
          {/*<Scheduled scheduleData={scheduleData} />
        <Box mb="4" />*/}
          <EventBox data={filteredEvents} categories={categories} />
        </Box>
      </Layout>
    </>
  )
}

export default Events
