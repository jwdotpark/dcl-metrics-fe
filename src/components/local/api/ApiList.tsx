import {
  Text,
  Box,
  List,
  ListItem,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"

const ApiList = ({ data }) => {
  const categories = []
  data.map((item) => {
    if (!categories.includes(item.data.category)) {
      categories.push(item.data.category)
    }
  })

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
                {data.map((item) => {
                  if (item.data.category === category) {
                    return (
                      <ListItem
                        key={item.data.title}
                        w="100%"
                        px="4"
                        py="2"
                        borderRadius="xl"
                        _hover={{
                          // eslint-disable-next-line react-hooks/rules-of-hooks
                          bg: useColorModeValue("gray.200", "gray.600"),
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          console.log("clicked")
                        }}
                      >
                        <Text fontSize="lg">{item.data.title}</Text>
                        <Text as="kbd">{item.data.description}</Text>
                      </ListItem>
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

export default ApiList
