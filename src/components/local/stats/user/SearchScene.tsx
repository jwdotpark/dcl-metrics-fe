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
} from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"
import { useCombobox } from "downshift"
import Link from "next/link"
import { useRouter } from "next/router"
import { formatDistanceToNow } from "date-fns"
import { mutateStringToURL } from "../../../../lib/hooks/utils"

const SearchScene = () => {
  const router = useRouter()
  const category = "scenes"
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

  const fetchLandData = async (debouncedSearch) => {
    try {
      setLoading(true)
      const url = `/api/search?category=${category}&name=${debouncedSearch}`
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
        func(...args)
      }, delay)
    }
  }

  const handleItemKeyDown = (event, item) => {
    if (isOpen && event.key === "Enter") {
      event.preventDefault()
      selectItem(item)
      router.push(`/scenes/${mutateStringToURL(item.name)}/${item}`)
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
    items: data.map((scene) => scene.name),
    onInputValueChange: ({ inputValue }) => {
      if (!inputValue) {
        setSearch("")
      } else {
        setSearch(inputValue)
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      const selectedLand = data.find((land) => land.name === selectedItem)
      if (selectedLand) {
        window.location.replace(
          `/scenes/${mutateStringToURL(selectedLand.name)}/${selectedLand.uuid}`
        )
      }
    },
    itemToString: (item) => (item ? item : ""),
  })

  const handleInputBlur = () => {
    if (inputRef.current && !isOpen) {
      setSearch("")
    }
  }

  const calculateDate = (dateString) => {
    if (dateString !== null) {
      const date = dateString.slice(0, 10)
      const formattedDate = formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
      return "Deployed " + formattedDate
    } else {
      return "N/A"
    }
  }

  const getImageUrl = (land) => {
    const center = land.coordinates.split(";")[0]
    const imageUrl = `https://api.decentraland.org/v2/map.png?center=${center}&selected=${land.coordinates}`
    return imageUrl
  }

  useEffect(() => {
    const debouncedFetchLandData = debounce(fetchLandData, 250)
    let isRedirected = false

    if (search) {
      debouncedFetchLandData(search)
    } else {
      setData([])
    }

    return () => {
      isRedirected = true

      if (isRedirected) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [search, router])

  const menuProps = getMenuProps()

  return (
    <GridItem borderRadius="xl" shadow="md" colSpan={gridColumn}>
      <Box pos="relative">
        <Input
          id="searchInput"
          {...getInputProps()}
          ref={inputRef}
          borderRadius="xl"
          onBlur={handleInputBlur}
          placeholder="Search scene"
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
              {isOpen &&
                search.length > 0 &&
                data.length > 0 &&
                data.map((land, index) => (
                  <ListItem
                    key={land.address}
                    {...getItemProps({
                      item: land.name,
                      index,
                      onKeyDownCapture: (event) => {
                        handleItemKeyDown(event, land.address)
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
                      href={`/scenes/${mutateStringToURL(land.name)}/${
                        land.uuid
                      }`}
                      target="_blank"
                      id={`user-link-${land.address}`}
                    >
                      <HStack>
                        <Box overflow="hidden" borderRadius="md">
                          <Image
                            w="35px"
                            h="35px"
                            alt={land.name}
                            src={getImageUrl(land)}
                          />
                        </Box>
                        <Box>
                          <Text fontWeight="bold" noOfLines={1}>
                            {land.name}
                          </Text>
                        </Box>
                        <Spacer />
                        <Box>
                          <Text as="kbd" fontSize="xs">
                            {calculateDate(land.first_seen_at)}
                          </Text>
                        </Box>
                      </HStack>
                    </Link>
                  </ListItem>
                ))}
            </Box>
          </List>
        </Box>
      </Box>
    </GridItem>
  )
}

export default SearchScene
