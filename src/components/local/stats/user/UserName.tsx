import { Box, Button, Center, Spinner } from "@chakra-ui/react"
import Link from "next/link"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PaginationBtnGroup from "./partial/PaginationBtnGroup"
import useSWR from "swr"
import { useState } from "react"

const UserName = ({ address }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json())

  const [pageNum, setPageNum] = useState(1)
  const pageSize = 30
  const queryParam = `?pageNum=${pageNum}&pageSize=${pageSize}`

  const nameUrl =
    `https://peer.decentraland.org/lambdas/users/${address}/names` + queryParam

  const { data, error, isLoading } = useSWR(nameUrl, fetcher)

  let UserNameContent: JSX.Element

  if (isLoading) {
    UserNameContent = (
      <Center h="200px">
        <Spinner />
      </Center>
    )
  } else if (error) {
    UserNameContent = <Center h="100%">Error</Center>
  } else {
    UserNameContent = (
      <Box>
        <PaginationBtnGroup
          val={data}
          pageNum={pageNum}
          setPageNum={setPageNum}
          pageSize={pageSize}
        />
        {data &&
          data.elements.map((item) => {
            return (
              <Button
                key={item.contractAddress}
                mr="2"
                mb="2"
                borderRadius="full"
                shadow="md"
                size="md"
              >
                <Link href={`/users/${item.contractAddress}`}>{item.name}</Link>
              </Button>
            )
          })}
      </Box>
    )
  }

  return (
    <>
      {data && data.elements.length > 0 && (
        <BoxWrapper colSpan={[1, 1, 1, 4, 2]}>
          <BoxTitle
            name={`User Name`}
            description={`User name description`}
            date=""
            avgData={[]}
            slicedData={{}}
            color={""}
            line={false}
            setLine={{}}
          />
          <Box m="4">{UserNameContent}</Box>
        </BoxWrapper>
      )}
    </>
  )
}

export default UserName
