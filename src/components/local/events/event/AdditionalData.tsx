import { Center, Spinner } from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import { EventRelatedEvent } from "./EventRelatedScene"

export const AdditionalData = ({ event, eventData }) => {
  const { occurrences } = eventData
  return (
    <BoxWrapper colSpan={[8, 8]}>
      <BoxTitle
        name={`Past Event Series Overview`}
        description="Detailed information on the past event series on this scene"
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      {occurrences !== undefined ? (
        <EventRelatedEvent event={event} data={occurrences} />
      ) : (
        <Center h="100px">
          <Spinner />
        </Center>
      )}
    </BoxWrapper>
  )
}
