import ApiLayout from "../../src/components/api-docs/ApiLayout"
import { Box, useBreakpointValue } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { getApiLists } from "../../markdown/helpers/post"
import { useState } from "react"
import Layout from "../../src/components/layout/layout"
import ApiList from "../../src/components/local/api/ApiList"
import MobileApiList from "../../src/components/local/api/MobileApiList"
import ApiExample from "../../src/components/local/api/ApiExample"

const ApiItem = ({ apiList }) => {
  const router = useRouter()
  const cursor = router.query.item
  const [category, title] = String(cursor).split("-")

  const foundItem = apiList.find(
    (item) => item.data.category === category && item.data.title === title
  )

  const [selectedItem, setSelectedItem] = useState(foundItem)

  return (
    <ApiLayout
      apiList={apiList}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    >
      <ApiExample selectedItem={selectedItem} />
    </ApiLayout>
  )
}

export default ApiItem

export async function getStaticProps() {
  const apiList = getApiLists()

  apiList
    .sort((a, b) => {
      return b.data.issue - a.data.issue
    })
    .reverse()

  return {
    props: {
      apiList,
    },
  }
}

export async function getStaticPaths() {
  const apiList = getApiLists()
  const paths = apiList.map((item) => ({
    params: { item: `${item.data.category}-${item.data.title}` },
  }))
  return {
    paths,
    fallback: false,
  }
}
