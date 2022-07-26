import { Box, Button } from "@chakra-ui/react"
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi"

const Pagination = ({ page, pages, setPage }) => {
  const prevClick = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const nextClick = () => {
    if (page < pages) {
      setPage(page + 1)
    }
  }
  return (
    <Box m="2" h="50">
      <Button
        size="sm"
        variant="ghost"
        onClick={prevClick}
        fontSize="sm"
        cursor="pointer"
      >
        <FiChevronsLeft />
      </Button>
      {Array.from({ length: pages }, (_, i) => {
        return (
          <Button
            key={i}
            size="sm"
            variant="ghost"
            onClick={() => {
              setPage(i + 1)
            }}
            color={page === i + 1 ? "gray.900" : "gray.400"}
            fontSize="sm"
            cursor="pointer"
          >
            {i + 1}
          </Button>
        )
      })}
      <Button
        size="sm"
        variant="ghost"
        onClick={nextClick}
        fontSize="sm"
        cursor="pointer"
      >
        <FiChevronsRight />
      </Button>
    </Box>
  )
}

export default Pagination
