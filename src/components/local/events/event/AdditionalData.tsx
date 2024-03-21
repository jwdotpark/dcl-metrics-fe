import { format } from "date-fns"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import { EventRelatedEvent } from "./EventRelatedScene"

export const AdditionalData = ({ event, eventData }) => {
  const { occurrences } = eventData
  return (
    <BoxWrapper colSpan={[8, 8]}>
      <BoxTitle
        name={`Event Overview on ${format(
          new Date(event.next_start_at),
          "dd MMMM yyyy"
        )}`}
        description=""
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <EventRelatedEvent data={occurrences} />
    </BoxWrapper>
  )
}
