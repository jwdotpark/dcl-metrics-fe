import {
  Box,
  Button,
  Center,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from "@chakra-ui/react"
//import Link from "next/link"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PaginationBtnGroup from "./partial/PaginationBtnGroup"
import useSWR from "swr"
import { useState } from "react"
import { format } from "date-fns"

const UserWearables = ({ address }) => {
  const toast = useToast()

  const fetcher = (url) => fetch(url).then((res) => res.json())

  const [pageNum, setPageNum] = useState(1)
  const pageSize = 10
  const queryParam = `?pageNum=${pageNum}&pageSize=${pageSize}`

  const wearableUrl =
    `https://peer.decentraland.org/lambdas/users/${address}/wearables` +
    queryParam

  const { data, error, isLoading } = useSWR(wearableUrl, fetcher)

  const DataTable = ({ elements }) => {
    return (
      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Rarity</Th>
            <Th>URN</Th>
            <Th>Amount</Th>
            <Th>Token ID</Th>
            <Th>Transferred At</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {elements.map((element) => (
            <Tr key={element.urn}>
              <Td fontWeight="bold">{element.name}</Td>
              <Td>{element.category}</Td>
              <Td>{element.rarity}</Td>
              <Td>{element.urn}</Td>
              <Td>{element.amount}</Td>
              <Td>
                <Button
                  fontSize="xs"
                  borderRadius="xl"
                  shadow="md"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      element.individualData[0].tokenId
                    )
                    toast({
                      description: "Token ID has been copied to the clipboard.",
                      duration: 4000,
                      isClosable: true,
                      position: "bottom-right",
                      status: "success",
                      variant: "subtle",
                    })
                  }}
                  size="xs"
                >
                  Copy Token Id
                </Button>
              </Td>
              <Td>
                {format(
                  new Date(
                    Number(element.individualData[0].transferredAt) * 1000
                  ),
                  "yyyy/MM/dd HH:mm"
                )}
              </Td>
              <Td>
                {Math.round(
                  Number(element.individualData[0].price) / 1000000000000000000
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )
  }

  let UserWearableContent: JSX.Element

  if (isLoading) {
    UserWearableContent = (
      <Center minH="600px">
        <Spinner />
      </Center>
    )
  } else if (error) {
    UserWearableContent = <Center h="100%">Error</Center>
  } else {
    UserWearableContent = (
      <Box>
        <PaginationBtnGroup
          val={data}
          pageNum={pageNum}
          setPageNum={setPageNum}
          pageSize={pageSize}
        />
        <Box overflowY="scroll">
          <DataTable elements={data.elements} />
        </Box>
      </Box>
    )
  }

  return (
    <BoxWrapper colSpan={[1, 1, 1, 4, 6]}>
      <BoxTitle
        name={`User Wearable`}
        description={`User wearable description`}
        date=""
        avgData={[]}
        slicedData={{}}
        color={""}
        line={false}
        setLine={{}}
      />
      <Box m="4">{UserWearableContent}</Box>
    </BoxWrapper>
  )
}

export default UserWearables
