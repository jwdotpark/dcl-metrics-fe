import ApiLayout from "../../src/components/docs/ApiLayout"
import ApiExample from "../../src/components/local/api/ApiExample"
import { getApiLists } from "../../markdown/helpers/post"
import { useState } from "react"

export const getServerSideProps = async () => {
  const apiList = getApiLists()

  apiList
    .sort((a, b) => {
      return b.data.issue - a.data.issue
    })
    .reverse()

  return {
    props: { apiList },
  }
}

const API = ({ children, apiList }) => {
  const [selectedItem, setSelectedItem] = useState(apiList[0])

  return (
    <ApiLayout
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      apiList={apiList}
    >
      <ApiExample selectedItem={selectedItem} />
      {children}
    </ApiLayout>
  )
}

export default API
