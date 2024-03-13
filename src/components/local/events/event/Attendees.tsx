import { Center, Flex } from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Profile } from "./Profile"

export const Attendees = ({ event }) => {
  const { total_attendees, latest_attendees } = event
  const extraAttendees = total_attendees - latest_attendees.length

  return (
    <BoxWrapper colSpan={[8, 8]}>
      <BoxTitle
        name={`${total_attendees} Attendees`}
        description=""
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <Flex direction="row" overflowX="scroll" m="4">
        {latest_attendees.map((id, i) => {
          return <Profile key={i} id={id} />
        })}
        {extraAttendees > 0 && <Center ml="2">...+{extraAttendees}</Center>}
      </Flex>
    </BoxWrapper>
  )
}
