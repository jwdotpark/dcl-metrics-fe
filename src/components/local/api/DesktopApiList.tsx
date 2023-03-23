import {
  Box,
  Text,
  List,
  ListItem,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react"
import Link from "next/link"
import BoxWrapper from "../../layout/local/BoxWrapper"

const DesktopApiList = ({
  categories,
  data,
  itemIndex,
  setItemIndex,
  setSelectedItem,
}) => {
  return (
    <BoxWrapper colSpan={2}>
      <Box m="4">
        {categories.map((category) => {
          return (
            <Box key={category}>
              <Box>
                <Text my="4" fontSize="4xl" fontWeight="bold">
                  {category.toUpperCase()}
                </Text>
              </Box>
              <List spacing={4}>
                {data.map((item, i) => {
                  if (
                    item.data.category === category &&
                    !item.data.subCategory
                  ) {
                    return (
                      <Link
                        href={`/api-docs/${item.data.category}-${item.data.title}`}
                        key={item.data.title}
                      >
                        <ListItem
                          key={item.data.title}
                          w="100%"
                          px="4"
                          py="2"
                          bg={
                            itemIndex === i &&
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            useColorModeValue("gray.200", "gray.700")
                          }
                          borderRadius="xl"
                          _hover={{
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            bg: useColorModeValue("gray.200", "gray.600"),
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSelectedItem(item)
                            setItemIndex(i)
                          }}
                        >
                          <Text fontSize="lg" fontWeight="semibold">
                            {item.data.title}
                          </Text>
                          <Text as="kbd">{item.data.description}</Text>
                        </ListItem>
                      </Link>
                    )
                  }
                })}
              </List>
              <Divider my="4" />
            </Box>
          )
        })}
      </Box>
    </BoxWrapper>
  )
}

export default DesktopApiList
