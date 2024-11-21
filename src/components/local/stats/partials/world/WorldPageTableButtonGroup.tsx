import {
  useColorModeValue,
  Center,
  ButtonGroup,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react"
import {
  FiArrowLeftCircle,
  FiArrowLeft,
  FiArrowRight,
  FiArrowRightCircle,
} from "react-icons/fi"
import GlobalTableFilter from "../scene/GlobalTableFilter"

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
    <Center ml="2">
      <ButtonGroup
        bg={useColorModeValue("gray.50", "gray.700")}
        borderRadius="md"
        shadow="md"
        isAttached
        size="xs"
      >
        <Button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
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
        <Button disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
          <FiArrowRightCircle />
        </Button>
      </ButtonGroup>
      <Flex w="100%" ml="2">
        <Spacer />
        <GlobalTableFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </Flex>
    </Center>
  )
}

export default ScenePageTableButtonGroup
