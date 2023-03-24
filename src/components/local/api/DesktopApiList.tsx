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
import SingleListItem from "./SingleListItem"

const DesktopApiList = ({
  categories,
  data,
  itemIndex,
  setItemIndex,
  setSelectedItem,
}) => {
  const noneCategory = data.find((item) => item.data.category === "")
  const noneCategoryIndex = data.indexOf(noneCategory)
  console.log(noneCategoryIndex)

  return (
    <BoxWrapper colSpan={[6, 6, 6, 2, 2]}>
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
              <Divider my="4" />
            </Box>
          )
        })}
      </Box>
    </BoxWrapper>
  )
}

export default DesktopApiList
