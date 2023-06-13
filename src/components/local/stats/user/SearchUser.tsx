import {
  GridItem,
  useColorModeValue,
  Input,
  useBreakpointValue,
  List,
  ListItem,
  Box,
  Spinner,
} from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"
import { useCombobox } from "downshift"

const SearchUser = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const debounceTimeoutRef = useRef(null)

  const bgColor = useColorModeValue("gray.200", "gray.700")
  const itemBgColor = useColorModeValue("gray.100", "gray.800")
  const itemHoverBgColor = useColorModeValue("gray.100", "gray.600")
  const itemHoverTextBgColor = useColorModeValue("gray.50", "gray.600")

  const fetchUserData = async (debouncedSearch) => {
    try {
      setLoading(true)
      const url = `/api/get-user?name=${debouncedSearch}`
      const response = await fetch(url)
      const res = await response.json()
      setData(res.result)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  // Debounce function
  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(debounceTimeoutRef.current)
      debounceTimeoutRef.current = setTimeout(() => {
        func.apply(null, args)
      }, delay)
    }
  }

  console.log(data)

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: data.map((user) => user.name),
    onInputValueChange: ({ inputValue }) => {
      if (!inputValue) {
        setSearch("")
      } else {
        setSearch(inputValue)
      }
    },
    onSelectedItemChange: ({ selectedItem }) => setSearch(selectedItem || ""),
    itemToString: (item) => (item ? item : ""),
  })

  const handleInputBlur = () => {
    if (inputRef.current && !isOpen) {
      setSearch("")
    }
  }

  useEffect(() => {
    const debouncedFetchUserData = debounce(fetchUserData, 500)
    if (search) {
      debouncedFetchUserData(search)
    } else {
      setData([])
    }

    return () => {
      clearTimeout(debounceTimeoutRef.current)
    }
  }, [search])

  return (
    <GridItem borderRadius="xl" shadow="md" colSpan={gridColumn}>
      <Box pos="relative">
        <Input
          {...getInputProps()}
          ref={inputRef}
          borderRadius="xl"
          onBlur={handleInputBlur}
          placeholder="Search users"
          size="lg"
          style={{
            borderRadius: "xl",
          }}
          variant="solid"
        />
        {loading && (
          <Box pos="absolute" top="50%" right={4} transform="translateY(-50%)">
            <Spinner size="md" />
          </Box>
        )}
        {isOpen && data.length > 0 && (
          <List
            display={
              isOpen && search.length > 0 && data.length > 0 ? "block" : "none"
            }
            {...getMenuProps()}
            pos="absolute"
            zIndex={1}
            //display="block"
            w="100%"
            mt={1}
            bg={bgColor}
            borderRadius="xl"
            shadow="sm"
          >
            {data.map((user, index) => (
              <ListItem
                key={user.address}
                {...getItemProps({ item: user.name, index })}
                px={4}
                py={2}
                bg={
                  highlightedIndex === index
                    ? itemBgColor
                    : itemHoverTextBgColor
                }
                _hover={{ bg: itemHoverBgColor }}
                cursor="pointer"
              >
                {user.name}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      {error && <div>{JSON.stringify(error)}</div>}
    </GridItem>
  )
}

export default SearchUser
