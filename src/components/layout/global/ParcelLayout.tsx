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
} from "@chakra-ui/react"
import AFKTimeSpentParcel from "../../local/stats/parcels/AFKTimeSpentParcel"
import AvgTimeSpentParcel from "../../local/stats/parcels/AvgTimeSpentParcel"
import LogInTimeSpentParcel from "../../local/stats/parcels/LogInTimeSpentParcel"
import LogOutTimeSpentParcel from "../../local/stats/parcels/LogOutTimeSpentParcel"
import MostVisitedParcel from "../../local/stats/parcels/MostVisitedParcel"

const ParcelLayout = ({ result, isDataLoading }) => {
  const gridColumn = useBreakpointValue({
    md: 1,
    lg: 2,
    xl: 2,
  })
  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          bg={useColorModeValue("gray.300", "gray.600")}
          _hover={{
            bg: useColorModeValue("gray.400", "gray.700"),
          }}
          _expanded={{
            bg: useColorModeValue("gray.300", "gray.600"),
            color: useColorModeValue("gray.800", "white"),
          }}
        >
          <Box flex="1" py="2" textAlign="center">
            <Text fontSize="2xl" fontWeight="semibold">
              PARCEL
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bg={useColorModeValue("gray.300", "gray.600")}>
        <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
          <AvgTimeSpentParcel
            parcel={result.parcels}
            isParcelLoading={isDataLoading}
          />
          <LogInTimeSpentParcel
            parcel={result.parcels}
            isParcelLoading={isDataLoading}
          />
          <AFKTimeSpentParcel
            parcel={result.parcels}
            isParcelLoading={isDataLoading}
          />
          <LogOutTimeSpentParcel
            parcel={result.parcels}
            isParcelLoading={isDataLoading}
          />
          <MostVisitedParcel
            parcel={result.parcels}
            isParcelLoading={isDataLoading}
          />
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default ParcelLayout
