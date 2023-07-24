import { Center, ButtonGroup, Button, Flex, Spacer } from "@chakra-ui/react"
import {
  FiArrowLeftCircle,
  FiArrowLeft,
  FiArrowRight,
  FiArrowRightCircle,
} from "react-icons/fi"
import GlobalTableFilter from "../scene/GlobalTableFilter"

const WorldPageTableButtonGroup = ({
  // eslint-disable-next-line no-unused-vars
  pageOptions,
  canPreviousPage,
  canNextPage,
  gotoPage,
  pageIndex,
  nextPage,
  previousPage,
  pageCount,
  globalFilter,
  setGlobalFilter,
}) => {
  const minPagesToShow = 5
  const totalPageCount = Math.max(minPagesToShow, pageCount)

  const renderPageButtons = () => {
    const pages = []
    let startPage, endPage

    if (totalPageCount <= minPagesToShow) {
      // If the total number of pages is less than or equal to minPagesToShow
      startPage = 0
      endPage = totalPageCount - 1
    } else if (pageIndex < Math.floor(minPagesToShow / 2)) {
      // If current page is near the beginning
      startPage = 0
      endPage = minPagesToShow - 1
    } else if (pageIndex >= totalPageCount - Math.floor(minPagesToShow / 2)) {
      // If current page is near the end
      startPage = totalPageCount - minPagesToShow
      endPage = totalPageCount - 1
    } else {
      // If current page is somewhere in the middle
      startPage = pageIndex - Math.floor(minPagesToShow / 2)
      endPage = pageIndex + Math.floor(minPagesToShow / 2)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => gotoPage(i)}
          variant={i === pageIndex ? "outline" : "solid"}
        >
          {i + 1}
        </Button>
      )
    }

    return pages
  }

  return (
    <Center w="100%" mx="4" my="4">
      <ButtonGroup borderRadius="xl" shadow="md" isAttached size="sm">
        <Button
          borderRadius="xl"
          disabled={!canPreviousPage}
          onClick={() => gotoPage(0)}
        >
          <FiArrowLeftCircle />
        </Button>
        <Button disabled={!canPreviousPage} onClick={() => previousPage()}>
          <FiArrowLeft />
        </Button>
        {renderPageButtons()}
        <Button disabled={!canNextPage} onClick={() => nextPage()}>
          <FiArrowRight />
        </Button>
        <Button
          borderRadius="xl"
          disabled={!canNextPage}
          onClick={() => gotoPage(pageCount - 1)}
        >
          <FiArrowRightCircle />
        </Button>
      </ButtonGroup>
      <Flex w="100%" mr="8">
        <Spacer />
        <GlobalTableFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </Flex>
    </Center>
  )
}

export default WorldPageTableButtonGroup
