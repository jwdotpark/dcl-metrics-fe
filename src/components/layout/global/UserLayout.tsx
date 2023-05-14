import {
  AccordionItem,
  AccordionPanel,
  Grid,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react"
import Explorer from "../../local/stats/Explorer"
import MarathonUsers from "../../local/stats/MarathonUsers"
import AccordionLabel from "../global/partials/AccordionLabel"

const UserLayout = ({ result }) => {
  const gridColumn = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 2,
  })
  return (
    <AccordionItem border="none">
      <AccordionLabel name="Users" />
      <AccordionPanel pb={4} bg={useColorModeValue("gray.300", "gray.600")}>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <MarathonUsers res={result} />
          <Explorer res={result} />
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default UserLayout
