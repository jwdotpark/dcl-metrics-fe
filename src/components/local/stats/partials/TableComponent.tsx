import {
  Center,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
  useColorMode,
} from "@chakra-ui/react"
import {
  dateRangeStr,
  sliceStr,
  normalizeValue,
} from "../../../../lib/data/tableInfo"

import ProfilePicture from "../../ProfilePicture"
import { convertSeconds } from "../../../../lib/hooks/utils"
import TableLink from "./TableLink"

const TableComponent = ({
  data,
  dateRange,
  propertyName,
  headList,
  bodyList,
}) => {
  const { colorMode } = useColorMode()
  const date = dateRangeStr(dateRange)
  const tableData = data[date][propertyName]

  const renderTd = (body, row) => {
    switch (body) {
      case "time_spent":
        return (
          <Td key={body}>
            <b>{convertSeconds(row[body])}</b>
          </Td>
        )
      case "parcels_visited":
        return (
          <Td key={body}>
            <b>{row[body]}</b>
          </Td>
        )
      case "name":
        return (
          <Td key={body}>
            <Flex>
              <ProfilePicture
                address={row.avatar_url}
                verified={row.verified_user}
                guest={row.guest_user}
              />
              <Center>{sliceStr(row.name)}</Center>
            </Flex>
          </Td>
        )
      case "address":
        return (
          <>
            <Td key={body}>{sliceStr(row.address)}</Td>
            <Td key={body}>
              <TableLink address={row.address} />
            </Td>
          </>
        )
      default:
        return null
    }
  }

  const TableHead = () => {
    return (
      <Tr>
        {headList.map((head) => (
          <Th key={head}>{head}</Th>
        ))}
      </Tr>
    )
  }

  const TableBody = () => {
    return (
      <Tbody>
        {tableData.map((row, i) => (
          <Tr
            key={row.time_spent}
            style={{
              background: `linear-gradient(90deg, #61CDBB50 ${
                normalizeValue(tableData)[i]
              }%, ${colorMode === "light" ? "white" : "#1A202C"} 0%`,
            }}
          >
            {bodyList.map((body) => (
              <>{renderTd(body, row)}</>
            ))}
          </Tr>
        ))}
      </Tbody>
    )
  }

  return (
    <TableContainer mt="2" mx="4">
      <Table h="auto" my="2" borderBottom="none" size="sm" variant="simple">
        <TableHead />
        <TableBody />
      </Table>
    </TableContainer>
  )
}

export default TableComponent
