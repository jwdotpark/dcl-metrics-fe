/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Center, Spinner, Grid } from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PaginationBtnGroup from "./partial/PaginationBtnGroup"
import useSWR from "swr"
import { useState } from "react"
import LandCard from "./partial/LandCard"

const UserLand = ({ address, name }) => {
  const [pageNum, setPageNum] = useState(1)
  const pageSize = 4
  const queryParam = `?pageNum=${pageNum}&pageSize=${pageSize}`

  const landUrl =
    `https://peer.decentraland.org/lambdas/users/${address}/lands` + queryParam

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error, isLoading } = useSWR(landUrl, fetcher)

  let UserLandContent: JSX.Element

  if (isLoading) {
    UserLandContent = (
      <Center minH="200px">
        <Spinner />
      </Center>
    )
  } else if (error) {
    UserLandContent = <Center minH="200px">Error</Center>
  } else if (data && data.elements.length > 0) {
    UserLandContent = (
      <Box minH="200px">
        <PaginationBtnGroup
          val={data}
          pageNum={pageNum}
          setPageNum={setPageNum}
          pageSize={pageSize}
        />
        <Grid
          gap={4}
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(4, 1fr)",
          ]}
        >
          {data.elements.map((land) => (
            <LandCard key={land.tokenId} land={land} pageNum={pageNum} />
          ))}
        </Grid>
      </Box>
    )
  }

  return (
    <>
      {!isLoading && data.elements.length > 0 && (
        <Box mb="4">
          <BoxWrapper colSpan={[1, 1, 1, 4, 6]}>
            <BoxTitle
              name={`User Land`}
              description={`List of lands owned by ${name} in Decentraland`}
              date=""
              avgData={[]}
              slicedData={{}}
              color={""}
              line={false}
              setLine={{}}
            />
            <Box m="4">{UserLandContent}</Box>
          </BoxWrapper>
        </Box>
      )}
    </>
  )
}

export default UserLand
