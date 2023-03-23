import { useState } from "react"
import DesktopApiList from "./DesktopApiList"
import MobileApiList from "./MobileApiList"

const ApiList = ({ data, setSelectedItem, isMobile }) => {
  const [itemIndex, setItemIndex] = useState(0)
  const categories = []

  data.map((item) => {
    if (!categories.includes(item.data.category)) {
      categories.push(item.data.category)
    }
  })

  return (
    <>
      {!isMobile ? (
        <DesktopApiList
          categories={categories}
          data={data}
          itemIndex={itemIndex}
          setItemIndex={setItemIndex}
          setSelectedItem={setSelectedItem}
        />
      ) : (
        <MobileApiList
          categories={categories}
          data={data}
          itemIndex={itemIndex}
          setItemIndex={setItemIndex}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  )
}

export default ApiList
