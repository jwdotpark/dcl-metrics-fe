import { Box, Wrap } from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Profile } from "./Profile"

export const Attendees = ({ attendees }) => {
  const { data } = attendees

  return (
    <BoxWrapper colSpan={[8, 8]}>
      <BoxTitle
        name={`${data.length} Attendees`}
        description=""
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <Box m="4">
        <Wrap gap={2}>
          {data.map((person) => {
            return <Profile key={person.user} id={person.user} />
          })}
        </Wrap>
      </Box>
    </BoxWrapper>
  )
}
