/* eslint-disable no-unused-vars */
import { Box } from "@chakra-ui/react"
import useSWR from "swr"

export const PaginatedScheduledEvents = ({ id }) => {
  const url = `https://events.decentraland.org/api/schedules`
  const fetcher = (url) => fetch(url).then((res) => res.json())
  // useSWR
  //const { data, isLoading, error } = useSWR(url, fetcher)

  return <Box m="4">{id}</Box>
}
