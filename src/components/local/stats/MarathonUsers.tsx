import {
  Text,
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Center,
  Button,
} from "@chakra-ui/react"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"
import { useEffect, useState } from "react"
import GridBox from "../GridBox"
import Pagination from "../Pagination"
import Loading from "../Loading"
import { convertSeconds } from "../../../lib/hooks/utils"
import { FiLink } from "react-icons/fi"
import ProfilePicture from "../ProfilePicture"
import { useMemo } from "react"
import { useTable, useSortBy } from "react-table"

// #1 Marathon Users
const MarathonUsers = ({ isLoading, res }) => {
  const data = Object.entries(res)
  const dataArr = []
  for (let i = 0; i < data.length; i++) {
    //  @ts-ignore
    for (let j = 0; j < data[i][1].length; j++) {
      dataArr.push({
        date: data[i][0],
        timeSpent: data[i][1][j].time_spent,
        address: data[i][1][j].address,
      })
    }
  }
  // sort by time_spent
  dataArr.sort((a, b) => {
    return b.timeSpent - a.timeSpent
  })

  // table pagination
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const pages = dataArr.length / rowsPerPage

  const COLUMNS = [
    // {
    //   Header: "Date",
    //   accessor: "date",
    // },
    {
      Header: "Time Spent",
      accessor: "timeSpent",
      Cell: ({ value }) => {
        return (
          <Box width="100px">
            <Text as="kbd" color="gray.900">
              <b>{convertSeconds(value)}</b>
            </Text>
          </Box>
        )
      },
      disableSortBy: true,
      disableFilters: true,
    },
    {
      Header: "Address",
      accessor: "address",
      Cell: ({ value }) => {
        return (
          <Box>
            <Box
              display="inline-block"
              mr="2"
              css={{ transform: "translateY(-2px)" }}
            >
              <ProfilePicture address={value} modal={false} />
            </Box>
            <Text as="kbd" color="gray.600" _hover={{ color: "gray.900" }}>
              <a
                target="_blank"
                href={"https://etherscan.io/address/" + `${value}`}
                rel="noreferrer"
              >
                {value}
              </a>
            </Text>
          </Box>
        )
      },
    },
  ]

  // eslint-disable-next-line
  const columns = useMemo(() => COLUMNS, [])
  // eslint-disable-next-line
  const memoizedData = useMemo(() => dataArr.slice(0, 10), [res])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columns, data: memoizedData }, useSortBy)

  const TableComponent = () => {
    return (
      <TableContainer mx="4" whiteSpace="nowrap" mt="4">
        <Table
          {...getTableProps()}
          size="sm"
          variant="unstyled"
          overflowX="hidden"
          maxW="100%"
          height="500px"
        >
          <Thead>
            {headerGroups.map((headerGroup, i) => (
              <Tr
                {...headerGroup.getHeaderGroupProps()}
                key={i}
                display="block"
              >
                {headerGroup.headers.map((column, j) => (
                  <Th
                    key={j}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <Box
                      display="inline-block"
                      mr="4"
                      css={{ transform: "translateY(2px)" }}
                    >
                      {/* {column.isSorted ? (
                        <FiChevronDown size="14px" />
                      ) : (
                        <FiChevronUp size="14px" />
                      )} */}
                    </Box>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <Tr
                  display="block"
                  borderBottom="1px solid rgba(0, 0, 0, 0.06)"
                  {...row.getRowProps()}
                  key={i}
                  style={{
                    background: `linear-gradient(90deg, #61CDBB50 ${
                      // FIXME convert to 100%
                      row.original.timeSpent / 2000
                    }%, #ffffff 0)`,
                  }}
                >
                  {row.cells.map((cell, j) => {
                    return (
                      <Td key={j} {...cell.getCellProps()}>
                        <Box display="inline-block">
                          <Text fontSize="sm" color="gray.600">
                            {cell.render("Cell")}
                          </Text>
                        </Box>
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    )
  }

  const box = {
    h: "600",
    w: "100%",
    bg: "white",
  }

  const [dateClicked, setDateClicked] = useState(false)

  return (
    <>
      <GridBox box={box}>
        <>
          <Box position="relative" mt="4" mx="5">
            <Text fontSize="xl">
              <b>Marathon Users </b>
              <Text fontSize="sm" color="gray.500">
                Users with most online time in the last 7 days
              </Text>
            </Text>
          </Box>
          {dataArr.length > 0 && !isLoading ? (
            <Box>
              <TableComponent />
            </Box>
          ) : (
            <Center h={box.h}>
              <Loading />
            </Center>
          )}
        </>
      </GridBox>
    </>
  )
}

export default MarathonUsers
