// @ts-nocheck
import { useBreakpointValue, Grid, useColorModeValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import staticGlobal from "../public/data/cached_global_response.json"
import { useAtom } from "jotai"
import { DataAtom, LoadingStateAtom } from "../src/lib/hooks/atoms"

import AFKTimeSpentParcel from "../src/components/local/stats/parcels/AFKTimeSpentParcel"
import AvgTimeSpentParcel from "../src/components/local/stats/parcels/AvgTimeSpentParcel"
import LogInTimeSpentParcel from "../src/components/local/stats/parcels/LogInTimeSpentParcel"
import LogOutTimeSpentParcel from "../src/components/local/stats/parcels/LogOutTimeSpentParcel"
import MostVisitedParcel from "../src/components/local/stats/parcels/MostVisitedParcel"

const Parcels = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const [data] = useAtom(DataAtom)
  const [isDataLoading] = useAtom(LoadingStateAtom)
  const result = data.length !== 0 ? data : staticGlobal

  return (
    <Layout>
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
    </Layout>
  )
}

export default Parcels
