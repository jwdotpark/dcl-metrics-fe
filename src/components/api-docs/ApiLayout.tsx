import { Grid, useBreakpointValue } from "@chakra-ui/react"
import Layout from "../layout/layout"
import ApiExample from "../local/api/ApiExample"
import ApiList from "../local/api/ApiList"
import MobileApiList from "../local/api/MobileApiList"

const ApiLayout = ({ children, apiList, selectedItem, setSelectedItem }) => {
  const gridColumn = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 6,
  })
  const isMobile = gridColumn === 1

  return (
    <Layout>
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
        {isMobile ? (
          <MobileApiList data={apiList} />
        ) : (
          <ApiList data={apiList} setSelectedItem={setSelectedItem} />
        )}
        {children}
      </Grid>
    </Layout>
  )
}

export default ApiLayout
