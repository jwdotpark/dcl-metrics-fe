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
    <Box m="2">
      <Button
        fontSize="sm"
        cursor="pointer"
        onClick={prevClick}
        size="sm"
        variant="ghost"
      >
        <FiChevronsLeft />
      </Button>
      {Array.from({ length: pages }, (_, i) => {
        return (
          <Button
            key={i}
            color={page === i + 1 ? "gray.900" : "gray.400"}
            fontSize="sm"
            cursor="pointer"
            onClick={() => {
              setPage(i + 1)
            }}
            size="sm"
            variant="ghost"
          >
            {i + 1}
          </Button>
        )
      })}
      <Button
        fontSize="sm"
        cursor="pointer"
        onClick={nextClick}
        size="sm"
        variant="ghost"
      >
        <FiChevronsRight />
      </Button>
    </Box>
  )
}

export default Pagination
