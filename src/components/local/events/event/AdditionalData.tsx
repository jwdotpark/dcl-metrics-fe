import { format } from "date-fns"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import { EventRelatedEvene } from "./EventRelatedScene"

export const AdditionalData = ({ event, eventData }) => {
  const { occurrences } = eventData
  return (
    <BoxWrapper colSpan={[8, 8]}>
      <BoxTitle
        name={`Overview on ${format(
          new Date(event.next_start_at),
          "MMM d, yyyy"
        )}`}
        description=""
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <EventRelatedEvene data={occurrences} />
    </BoxWrapper>
  )
}
