import ApiLayout from "../../src/components/docs/ApiLayout"
import ApiExample from "../../src/components/local/api/ApiExample"
import { getApiLists } from "../../markdown/helpers/post"
import { useState } from "react"

export const getStaticProps = async () => {
  const apiList = getApiLists()

  return {
    props: { apiList },
  }
}

const API = ({ apiList }) => {
  const [selectedItem, setSelectedItem] = useState(apiList[0])

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

export default API
