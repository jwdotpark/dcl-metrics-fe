import {
  Box,
  Image,
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
  const pageSize = 5
  const queryParam = `?pageNum=${pageNum}&pageSize=${pageSize}`

  const wearableUrl =
    `https://peer.decentraland.org/lambdas/users/${address}/wearables` +
    queryParam

  const { data, error, isLoading } = useSWR(wearableUrl, fetcher)

  data &&
    data.elements.sort((a, b) => {
      return (
        Number(b.individualData[0].transferredAt) -
        Number(a.individualData[0].transferredAt)
      )
    })

  const DataTable = ({ elements }) => {
    return (
      <Table overflowX="scroll" size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Thumbnail</Th>
            <Th>Amount</Th>
            <Th>Price</Th>
            <Th>Category</Th>
            <Th>Rarity</Th>
            <Th>Token ID</Th>
            <Th>Transferred At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {elements.map((element) => (
            <Tr key={element.urn}>
              <Td fontWeight="bold">{element.name}</Td>
              <Td>
                <Center w="60px" h="60px">
                  <Image
                    alt={element.name}
                    src={`https://peer.decentraland.org/lambdas/collections/contents/${element.urn}/thumbnail`}
                  />
                </Center>
              </Td>
              <Td>{element.amount}</Td>
              <Td>
                {Math.round(
                  Number(element.individualData[0].price) / 1000000000000000000
                )}
              </Td>
              <Td>{element.category}</Td>
              <Td>{element.rarity}</Td>
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
                  "yyyy/MM/dd"
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
      <Center h="200px">
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
    <Box mb="4">
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
        <Box m="4">
          {data && data.elements.length > 0 && UserWearableContent}
        </Box>
      </BoxWrapper>
    </Box>
  )
}

export default UserWearables
