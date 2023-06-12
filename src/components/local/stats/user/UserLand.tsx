/* eslint-disable react-hooks/rules-of-hooks */
import {
  Text,
  Image,
  Box,
  Center,
  Spinner,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PaginationBtnGroup from "./partial/PaginationBtnGroup"
import useSWR from "swr"
import { useState } from "react"
import Link from "next/link"

const UserLand = ({ address, name }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json())

  const [pageNum, setPageNum] = useState(1)
  const pageSize = 8
  const queryParam = `?pageNum=${pageNum}&pageSize=${pageSize}`

  const landUrl =
    `https://peer.decentraland.org/lambdas/users/${address}/lands` + queryParam

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
  } else {
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
            <Box
              key={land.tokenId}
              p="4"
              bg={useColorModeValue("gray.300", "gray.700")}
              shadow="md"
              _hover={{
                bg: useColorModeValue("gray.100", "gray.600"),
                cursor: "pointer",
              }}
              rounded="xl"
            >
              <Link href={`/users/${land.contractAddress}`} target="_blank">
                <Image
                  minH="50px"
                  borderRadius="xl"
                  alt={land.name}
                  src={land.image}
                />
                <Box p="2">
                  <Box my={2} fontSize="xs">
                    {land.category
                      ? land.category.toUpperCase()
                      : "No Category"}{" "}
                    {land.x && land.y && `[${land.x}, ${land.y}]`}
                  </Box>
                  <Box my={2} fontSize="md" fontWeight="bold">
                    {land.name ? land.name : "No Name"}{" "}
                  </Box>
                  <Box fontSize="sm">
                    <Text noOfLines={3}>
                      {land.description ? land.description : "No Description"}
                    </Text>
                  </Box>
                </Box>
              </Link>
            </Box>
          ))}
        </Grid>
      </Box>
    )
  }

  return (
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
  )
}

export default UserLand
