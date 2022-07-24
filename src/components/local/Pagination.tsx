import { Box, Button } from "@chakra-ui/react"

const Pagination = ({ page, pages, setPage }) => {
  return (
    <Box m="2">
      {Array.from({ length: pages }, (_, i) => {
        return (
          <Button
            key={i}
            size="sm"
            variant="ghost"
            onClick={() => {
              setPage(i + 1)
            }}
            color={page === i + 1 ? "blue.500" : "gray.500"}
            fontSize="sm"
            cursor="pointer"
          >
            {i + 1}
          </Button>
        )
      })}
    </Box>
  )
}

export default Pagination
