import {
  Text,
  Box,
  AccordionItem,
  AccordionButton,
  useColorModeValue,
  AccordionIcon,
  AccordionPanel,
  Grid,
  useBreakpointValue,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react"
import AFKTimeSpentParcel from "../../local/stats/parcels/AFKTimeSpentParcel"
import AvgTimeSpentParcel from "../../local/stats/parcels/AvgTimeSpentParcel"
import LogInTimeSpentParcel from "../../local/stats/parcels/LogInTimeSpentParcel"
import LogOutTimeSpentParcel from "../../local/stats/parcels/LogOutTimeSpentParcel"
import MostVisitedParcel from "../../local/stats/parcels/MostVisitedParcel"
import AccordionLabel from "./partials/AccordionLabel"
// import AccordionLink from "../global/partials/AccordionLink"
import AccordionViewMore from "../global/partials/AccordionViewMore"

const ParcelLayout = ({ result, isDataLoading }) => {
  const gridColumn = useBreakpointValue({
    md: 1,
    lg: 2,
    xl: 2,
  })
  const { isOpen, onToggle } = useDisclosure()

  return (
    <AccordionItem border="none">
      <AccordionLabel name="Parcels" />
      <AccordionPanel
        pb={4}
        bg={useColorModeValue("gray.300", "gray.600")}
        borderBottomWidth="0"
        borderBottomRadius="xl"
      >
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <AvgTimeSpentParcel parcel={result.parcels} />
          <MostVisitedParcel parcel={result.parcels} />
        </Grid>
        <Collapse animateOpacity in={isOpen}>
          <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
            <LogInTimeSpentParcel parcel={result.parcels} />
            <AFKTimeSpentParcel parcel={result.parcels} />
            <LogOutTimeSpentParcel parcel={result.parcels} />
          </Grid>
        </Collapse>
        <AccordionViewMore isOpen={isOpen} onToggle={onToggle} />
      </AccordionPanel>
    </AccordionItem>
  )
}

export default ParcelLayout
