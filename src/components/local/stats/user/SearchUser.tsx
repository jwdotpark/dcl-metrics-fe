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
  Tag,
} from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"
import { useCombobox } from "downshift"
import Link from "next/link"
import { useRouter } from "next/router"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const SearchUser = () => {
  const router = useRouter()
  const category = "users"
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const debounceTimeoutRef = useRef(null)

  const bgColor = useColorModeValue("gray.100", "gray.700")
  const itemBgColor = useColorModeValue("gray.100", "gray.800")
  const itemHoverTextBgColor = useColorModeValue("white", "gray.600")

  const sortByLastSeen = (data) => {
    return data.sort(
      (a, b) =>
        new Date(b.last_seen).valueOf() - new Date(a.last_seen).valueOf()
    )
  }

  const fetchUserData = async (debouncedSearch) => {
    try {
      setLoading(true)
      const url = `/api/search?category=${category}&name=${debouncedSearch}`
      const response = await fetch(url)
      const res = await response.json()
      const value = res.result
      setData(sortByLastSeen(value))
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

  const handleItemKeyDown = (event, item) => {
    if (isOpen && event.key === "Enter") {
      event.preventDefault()
      selectItem(item)
      router.push(`/users/${item}`)
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
    onSelectedItemChange: ({ selectedItem }) => {
      const selectedUser = data.find((user) => user.name === selectedItem)
      if (selectedUser) {
        window.location.assign(`/users/${selectedUser.address}`)
      }
    },
    itemToString: (item) => (item ? item : ""),
  })

  const handleInputBlur = () => {
    if (inputRef.current && !isOpen) {
      setSearch("")
    }
  }

  useEffect(() => {
    const debouncedFetchUserData = debounce(fetchUserData, 250)
    let isRedirected = false

    if (search) {
      debouncedFetchUserData(search)
    } else {
      setData([])
    }

    return () => {
      isRedirected = true

      if (isRedirected) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, router])

  const menuProps = getMenuProps()

  return (
    <GridItem borderRadius="xl" shadow="md" colSpan={gridColumn}>
      <Box pos="relative">
        <Input
          id="searchInput"
          {...getInputProps()}
          ref={inputRef}
          bg={useColorModeValue("white", "gray.700")}
          border="1px solid"
          borderColor={useColorModeValue("white", "gray.600")}
          borderRadius="xl"
          onBlur={handleInputBlur}
          placeholder="Search user"
          size="lg"
          style={{
            borderRadius: "xl",
          }}
          variant="outline"
        />
        {loading && (
          <Box pos="absolute" top="50%" right={4} transform="translateY(-50%)">
            <Spinner size="md" />
          </Box>
        )}
        <Box
          pos="absolute"
          zIndex={1}
          top="100%"
          left={0}
          display={isOpen && data.length > 0 ? "block" : "none"}
          overflow="hidden"
          w="100%"
          mt="2"
          borderRadius="xl"
          shadow="xl"
        >
          <List
            {...menuProps}
            bg={bgColor}
            borderRadius="xl"
            shadow="sm"
            style={{
              backdropFilter: "blur(10px)",
            }}
          >
            <Box>
              {isOpen ? (
                search.length > 0 &&
                data.length > 0 &&
                data.map((user, index) => (
                  <ListItem
                    key={user.address}
                    {...getItemProps({
                      item: user.name,
                      index,
                      // NOTE
                      onKeyDownCapture: (event) => {
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
                    borderBottom="1px solid #A0AEC050"
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
                        <Box>
                          <Text as="kbd" fontSize="xs">
                            {formatDistanceToNow(new Date(user.last_seen), {
                              addSuffix: true,
                            })}
                          </Text>
                        </Box>
                        <Spacer />
                        <Box display={user.verified ? "block" : "none"}>
                          <Tag
                            fontSize="xs"
                            fontWeight="semibold"
                            bg="green.400"
                          >
                            {user.verified && "Verified"}
                          </Tag>
                        </Box>
                        <Box display={user.dao_member ? "block" : "none"}>
                          <Tag
                            fontSize="xs"
                            fontWeight="semibold"
                            bg="blue.400"
                          >
                            {user.dao_member && "DAO Member"}
                          </Tag>
                        </Box>
                        <Box display={user.guest ? "block" : "none"}>
                          <Tag
                            fontSize="xs"
                            fontWeight="semibold"
                            bg="yellow.400"
                          >
                            {user.guest && "Guest"}
                          </Tag>
                        </Box>
                      </HStack>
                    </Link>
                  </ListItem>
                ))
              ) : (
                <div
                  ref={inputRef}
                  style={{ height: 0, visibility: "hidden" }}
                />
              )}
            </Box>
          </List>
        </Box>
      </Box>
    </GridItem>
  )
}

export default SearchUser
