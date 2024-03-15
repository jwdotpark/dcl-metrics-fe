/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"
import {
  Box,
  Wrap,
  Flex,
  Center,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Profile } from "./Profile"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

export const Attendees = ({ attendees, itemsPerPage = 30 }) => {
  const { data } = attendees
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = data.slice(startIndex, endIndex)

  return (
    <BoxWrapper colSpan={[8, 8]}>
      <BoxTitle
        name={`${data.length} Attendees`}
        description=""
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <Flex direction="row" w="100%" px="4">
        <Center>
          <IconButton
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="full"
            shadow="md"
            aria-label="Previous Page"
            icon={<FiArrowLeft />}
            isDisabled={currentPage > 1 ? false : true}
            isRound={true}
            onClick={() => handlePageChange(currentPage - 1)}
            size="sm"
          />
        </Center>
        <Box mb="4">
          <Wrap justify="left">
            {currentData.map((person) => (
              <Profile key={person.user} id={person.user} />
            ))}
          </Wrap>
        </Box>
        <Center>
          <IconButton
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="full"
            shadow="md"
            aria-label="Next Page"
            icon={<FiArrowRight />}
            isDisabled={currentPage < totalPages ? false : true}
            onClick={() => handlePageChange(currentPage + 1)}
            size="sm"
          />
        </Center>
      </Flex>
    </BoxWrapper>
  )
}
