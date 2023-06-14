import {
  GridItem,
  useColorModeValue,
  Input,
  useBreakpointValue,
  List,
  ListItem,
  Box,
  Spinner,
  Avatar,
  Text,
  HStack,
  Spacer,
  AvatarBadge,
} from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"
import { useCombobox } from "downshift"
import Link from "next/link"
import { useRouter } from "next/router"

const SearchUser = () => {
  const router = useRouter()
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

  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(debounceTimeoutRef.current)
      debounceTimeoutRef.current = setTimeout(() => {
        func.apply(null, args)
      }, delay)
    }
  }

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    selectItem,
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

  const handleItemKeyDown = (event, item) => {
    if (isOpen && event.key === "Enter") {
      event.preventDefault()
      selectItem(item)
      router.push(`/users/${item}`)
    }
  }

  useEffect(() => {
    const debouncedFetchUserData = debounce(fetchUserData, 250)
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
            zIndex={1}
            w="100%"
            mt={1}
            bg={bgColor}
            borderRadius="xl"
            shadow="sm"
          >
            {data.map((user, index) => (
              <ListItem
                key={user.address}
                {...getItemProps({
                  item: user.name,
                  index,
                  onKeyDown: (event) => {
                    handleItemKeyDown(event, user.address)
                  },
                })}
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
                <Link
                  href={`/users/${user.address}`}
                  target="_blank"
                  id={`user-link-${user.address}`}
                >
                  <HStack>
                    <Box>
                      <Avatar size="sm" src={user.avatar_url}>
                        <AvatarBadge
                          boxSize="1.25em"
                          bg={
                            user.verified
                              ? "green.400"
                              : user.dao_member
                              ? "blue.400"
                              : "yellow.400"
                          }
                        />
                      </Avatar>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">{user.name}</Text>
                    </Box>
                    <Spacer />
                    <Box display={user.verified ? "block" : "none"}>
                      <Text
                        color="green.400"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        {user.verified && "Verified"}
                      </Text>
                    </Box>
                    <Box display={user.dao_member ? "block" : "none"}>
                      <Text
                        color="blue.400"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        {user.dao_member && "DAO Member"}
                      </Text>
                    </Box>
                    <Box display={user.guest ? "block" : "none"}>
                      <Text
                        color="yellow.400"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        {user.guest && "Guest"}
                      </Text>
                    </Box>

                    <Box>
                      <Text as="kbd" fontSize="sm">
                        {user.first_seen} - {user.last_seen}
                      </Text>
                    </Box>
                  </HStack>
                </Link>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </GridItem>
  )
}

export default SearchUser
