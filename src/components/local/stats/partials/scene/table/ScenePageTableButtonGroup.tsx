import { Center, ButtonGroup, Button, Flex, Spacer } from "@chakra-ui/react"
import {
  FiArrowLeftCircle,
  FiArrowLeft,
  FiArrowRight,
  FiArrowRightCircle,
} from "react-icons/fi"
import GlobalTableFilter from "../GlobalTableFilter"

const ScenePageTableButtonGroup = ({
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
  return (
    <Center w="100%" mx="4">
      <ButtonGroup borderRadius="xl" shadow="md" isAttached size="xs">
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
        <Button>
          <b>{pageIndex + 1}</b>/{pageOptions.length}
        </Button>
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

export default ScenePageTableButtonGroup
