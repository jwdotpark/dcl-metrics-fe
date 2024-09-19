import ApiLayout from "../../../../src/components/docs/ApiLayout"
import ApiExample from "../../../../src/components/local/api/ApiExample"
import { getApiLists } from "../../../../markdown/helpers/post"
import React, { useState } from "react"
import { useRouter } from "next/router"

export const getServerSideProps = async ({ resolvedUrl }) => {
  const apiList = getApiLists()

  const urlArray = resolvedUrl.split("/")
  const category = urlArray[2]
  const subcategory = urlArray[3]

  return {
    props: { apiList, category, subcategory },
  }
}

const APIPage = ({ apiList, category, subcategory }) => {
  const router = useRouter()
  const article = apiList.find(
    (item) => item.data.category === category && item.data.title === subcategory
  )

  !article && router.push("/docs")

  const [selectedItem, setSelectedItem] = useState(article)

  return (
    <ApiLayout
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      apiList={apiList}
    >
      <ApiExample selectedItem={selectedItem} />
    </ApiLayout>
  )
}

export default APIPage
