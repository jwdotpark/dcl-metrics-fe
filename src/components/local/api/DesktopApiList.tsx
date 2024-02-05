import { Box, Text, List, Divider } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import SingleListItem from "./SingleListItem"

const DesktopApiList = ({
  categories,
  data,
  itemIndex,
  setItemIndex,
  setSelectedItem,
}) => {
  return (
    <BoxWrapper colSpan={[6, 6, 6, 2, 2]}>
      <Box m="4">
        {categories.map((category) => {
          return (
            <Box key={category}>
              <Box>
                <Text fontSize="xl" fontWeight="bold">
                  {category.toUpperCase()}
                </Text>
              </Box>

              <List spacing={2}>
                {data.map((item) => {
                  if (item.data.category === category) {
                    return (
                      <SingleListItem
                        key={item.data.title}
                        item={item}
                        itemIndex={itemIndex}
                        setItemIndex={setItemIndex}
                        setSelectedItem={setSelectedItem}
                        i={item.data.issue}
                      />
                    )
                  }
                })}
              </List>
              <Divider my="2" />
            </Box>
          )
        })}
      </Box>
    </BoxWrapper>
  )
}

export default DesktopApiList
