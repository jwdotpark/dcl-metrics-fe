import { useState } from "react"
import BoxTitle from "../../layout/local/BoxTitle"
import DateRangeButton from "./daterange/DateRangeButton"
import { defaultDateRange } from "../../../lib/data/chartInfo"
import BoxWrapper from "../../layout/local/BoxWrapper"
import TableComponent from "./partials/TableComponent"

const Explorer = ({ res }) => {
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const headList = ["Parcels Visited", "User", "Address", "Link"]
  const bodyList = ["parcels_visited", "name", "address", "Link"]

  return (
    <BoxWrapper colSpan={0}>
      <BoxTitle
        name="Explorers"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="Users that visited the most parcels in the last period"
      />
      <DateRangeButton
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="users_explorers"
        yesterday={true}
      />

      <TableComponent
        data={res}
        dateRange={dateRange}
        propertyName={bodyList[0]}
        headList={headList}
        bodyList={bodyList}
      />
    </BoxWrapper>
  )
}

export default Explorer
