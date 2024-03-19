/* eslint-disable no-unused-vars */
import {
  Image,
  GridItem,
  useColorModeValue,
  Input,
  useBreakpointValue,
  List,
  ListItem,
  Box,
  Spinner,
  Text,
  HStack,
  Spacer,
  Tag,
} from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"
import { useCombobox } from "downshift"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

export const SearchEvent = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const debounceTimeoutRef = useRef(null)

  const bgColor = useColorModeValue("gray.100", "gray.700")
  const itemBgColor = useColorModeValue("gray.100", "gray.800")
  const itemHoverTextBgColor = useColorModeValue("white", "gray.600")

  const fetchEventData = async (debouncedSearch: string) => {
    try {
      setLoading(true)
      const url = `https://events.decentraland.org/api/events?search=${debouncedSearch}`
      const response = await fetch(url)
      const res = await response.json()
      setData(res.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const debounce = (
    func: (debouncedSearch: string) => Promise<void>,
    delay: number
  ) => {
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
    items: data.map((event) => event.name),
    onInputValueChange: ({ inputValue }) => {
      if (!inputValue) {
        setSearch("")
      } else {
        setSearch(inputValue)
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      const selectedEvent = data.find((event) => event.name === selectedItem)
      if (selectedEvent) {
        window.location.assign(`/events/${selectedEvent.id}`)
      }
    },
    itemToString: (item) => (item ? item : ""),
  })

  const handleInputBlur = () => {
    if (inputRef.current && !isOpen) {
      setSearch("")
    }
  }

  const isMobile = useBreakpointValue({ base: true, md: false })

  useEffect(() => {
    const debouncedFetchEventData = debounce(fetchEventData, 250)
    let isRedirected = false

    if (search) {
      debouncedFetchEventData(search)
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
  }, [search])

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
          placeholder="Search event"
          size="lg"
          style={{
            borderRadius: "xl",
          }}
          variant="outline"
        />
        {loading && (
          <Box
            pos="absolute"
            zIndex={1}
            top="50%"
            right={4}
            transform="translateY(-50%)"
          >
            <Spinner size="sm" />
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
                data.slice(0, 10).map((event, index) => (
                  <ListItem
                    key={event.id}
                    {...getItemProps({
                      item: event.name,
                      index,
                      onKeyDownCapture: (event) => {
                        handleItemKeyDown(event, event)
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
                    <HStack>
                      <Box>
                        <Box
                          overflow="hidden"
                          w="75px"
                          h="auto"
                          maxH="50px"
                          borderRadius="md"
                        >
                          <Image
                            objectFit="cover"
                            alt={event.name}
                            src={event.image}
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">{event.name}</Text>
                      </Box>
                      <Box display={isMobile ? "none" : "block"}>
                        <Text as="kbd" fontSize="xs">
                          {formatDistanceToNow(new Date(event.start_at), {
                            addSuffix: true,
                          })}
                        </Text>
                      </Box>
                      <Spacer />
                      <Box display={event.world ? "block" : "none"}>
                        <Tag fontSize="xs" fontWeight="semibold" bg="blue.400">
                          World
                        </Tag>
                      </Box>
                      <Box display={event.trending ? "block" : "none"}>
                        <Tag
                          fontSize="xs"
                          fontWeight="semibold"
                          bg="yellow.400"
                        >
                          Trending
                        </Tag>
                      </Box>
                    </HStack>
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
