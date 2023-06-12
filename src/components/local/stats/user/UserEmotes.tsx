import {
  Box,
  Text,
  Image,
  Center,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PaginationBtnGroup from "./partial/PaginationBtnGroup"
import useSWR from "swr"
import { useState } from "react"
import { format } from "date-fns"

const UserEmotes = ({ address }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json())

  const [pageNum, setPageNum] = useState(1)
  const pageSize = 5
  const queryParam = `?pageNum=${pageNum}&pageSize=${pageSize}`

  const nameUrl =
    `https://peer.decentraland.org/lambdas/users/${address}/emotes` + queryParam

  const { data, error, isLoading } = useSWR(nameUrl, fetcher)

  data &&
    data.elements.sort((a, b) => {
      return (
        Number(b.individualData[0].transferredAt) -
        Number(a.individualData[0].transferredAt)
      )
    })

  let UserEmotesContent: JSX.Element

  if (isLoading) {
    UserEmotesContent = (
      <Center h="200px">
        <Spinner />
      </Center>
    )
  } else if (error) {
    UserEmotesContent = <Center h="100%">Error</Center>
  } else {
    UserEmotesContent = (
      <Box>
        <PaginationBtnGroup
          val={data}
          pageNum={pageNum}
          setPageNum={setPageNum}
          pageSize={pageSize}
        />
        <Box overflowX="scroll" minH="200px">
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Thumbnail</Th>
                <Th>Amount</Th>
                <Th>Price</Th>
                <Th>Category</Th>
                <Th>Rarity</Th>
                <Th>Transferred At</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.elements.map((item) => (
                <Tr key={item.urn}>
                  <Td>
                    <Text fontWeight="bold">{item.name}</Text>
                  </Td>
                  <Td>
                    <Center w="60px" h="60px">
                      <Image
                        alt={item.name}
                        src={`https://peer.decentraland.org/lambdas/collections/contents/${item.urn}/thumbnail`}
                      />
                    </Center>
                  </Td>
                  <Td>{item.amount}</Td>

                  <Td>
                    {Math.round(
                      Number(item.individualData[0].price) / 1000000000000000000
                    )}
                  </Td>
                  <Td>{item.category}</Td>
                  <Td>{item.rarity}</Td>
                  <Td>
                    {format(
                      new Date(
                        Number(item.individualData[0].transferredAt) * 1000
                      ),
                      "yyyy/MM/dd"
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    )
  }

  return (
    <Box mb="4">
      {data && data.elements.length > 0 && (
        <BoxWrapper colSpan={[1, 1, 1, 4, 6]}>
          <BoxTitle
            name={`User Emotes`}
            description={`User emote description`}
            date=""
            avgData={[]}
            slicedData={{}}
            color={""}
            line={false}
            setLine={{}}
          />
          <Box m="4">{UserEmotesContent}</Box>
        </BoxWrapper>
      )}
    </Box>
  )
}

export default UserEmotes
