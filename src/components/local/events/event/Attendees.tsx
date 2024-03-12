import { useBreakpointValue, Box, Grid } from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Profile } from "./Profile"

export const Attendees = ({ event }) => {
  const { latest_attendees } = event
  const row = useBreakpointValue({ base: 2, sm: 2, md: 3, lg: 5 })

  return (
    <BoxWrapper colSpan={[8, 4]}>
      <BoxTitle
        name="Latest Attendees"
        description=""
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <Box m="4">
        <Grid gap={6} templateColumns={`repeat(${row}, 2fr)`}>
          {latest_attendees.map((id, i) => {
            return <Profile key={i} id={id} />
          })}
        </Grid>
      </Box>
    </BoxWrapper>
  )
}
