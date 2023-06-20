/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, ButtonGroup, useColorModeValue } from "@chakra-ui/react"
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi"

const PaginationBtnGroup = ({ val, pageSize, pageNum, setPageNum }) => {
  const totalAmount = val.totalAmount
  const totalPages = Math.ceil(totalAmount / pageSize)

  const handlePageChange = (page) => {
    setPageNum(page)
  }

  const renderPaginationButtons = () => {
    if (totalPages <= 1) {
      return null // Don't render the buttons if there's only one page
    }

    const buttons = []
    const maxButtonsToShow = 8
    const halfMaxButtons = Math.floor(maxButtonsToShow / 2)
    let startPage = Math.max(1, pageNum - halfMaxButtons)
    let endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages)

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1)
    }

    if (startPage > 1) {
      buttons.push(
        <Button
          key="first"
          w="100%"
          colorScheme="gray"
          onClick={() => handlePageChange(1)}
          size="sm"
        >
          <FiArrowLeftCircle />
        </Button>
      )
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <Button
          key={page}
          w="100%"
          bg={
            pageNum === page
              ? useColorModeValue("gray.300", "gray.800")
              : useColorModeValue("gray.200", "gray.700")
          }
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          onClick={() => handlePageChange(page)}
          size="sm"
        >
          {page}
        </Button>
      )
    }

    if (endPage < totalPages) {
      buttons.push(
        <Button
          key="last"
          w="100%"
          colorScheme="gray"
          onClick={() => handlePageChange(totalPages)}
          size="sm"
        >
          <FiArrowRightCircle />
        </Button>
      )
    }

    return buttons
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <Box w="100%" my="4">
      <ButtonGroup w="100%" borderRadius="xl" shadow="md" isAttached>
        {renderPaginationButtons()}
      </ButtonGroup>
    </Box>
  )
}

export default PaginationBtnGroup
