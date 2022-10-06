import {
  AccordionItem,
  AccordionPanel,
  Grid,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react"
import Explorer from "../../local/stats/Explorer"
import MarathonUsers from "../../local/stats/MarathonUsers"
import UniqueVisitors from "../../local/stats/UniqueVisitors"
import VisitedParcels from "../../local/stats/UniqueVisitors"
import AccordionLabel from "../global/partials/AccordionLabel"

const UserLayout = ({ result, isDataLoading }) => {
  const gridColumn = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 2,
  })
  return (
    <AccordionItem>
      <AccordionLabel name="Users" />
      <AccordionPanel pb={4} bg={useColorModeValue("gray.300", "gray.600")}>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <UniqueVisitors data={result.global} visitorLoading={isDataLoading} />
          <VisitedParcels data={result.global} visitorLoading={isDataLoading} />
          <MarathonUsers res={result.users} isLoading={isDataLoading} />
          <Explorer res={result.users} isLoading={isDataLoading} />
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default UserLayout
