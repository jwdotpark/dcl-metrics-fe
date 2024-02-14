import { Center, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import { FiGrid, FiList } from "react-icons/fi"
import BoxWrapper from "../../layout/local/BoxWrapper"
import ToolTip from "../../layout/local/ToolTip"
import EventCardGrid from "./EventCardGrid"
import EventCardList from "./EventCardList"

const EventBox = ({ data }) => {
  const [grid, setGrid] = useState("list")

  const handleGridForm = () => {
    switch (grid) {
      case "grid":
        return <EventCardGrid data={data} />
      case "list":
        return <EventCardList data={data} />
      default:
        return <EventCardGrid data={data} />
    }
  }

  const handleGridFormChange = () => {
    if (grid === "grid") {
      setGrid("list")
    } else {
      setGrid("grid")
    }
  }

  return (
    <BoxWrapper colSpan="0">
      <Flex m="2" mb="4">
        <ToolTip label="Change View">
          <Flex
            direction="row"
            gap="2"
            ml="4"
            _hover={{ cursor: "pointer" }}
            onClick={() => handleGridFormChange()}
          >
            {grid === "grid" ? (
              <Flex direction="row">
                <Center>
                  <FiGrid />
                  <Text ml="2" fontSize="sm">
                    Grid View
                  </Text>
                </Center>
              </Flex>
            ) : (
              <Flex direction="row">
                <Center>
                  <FiList />
                  <Text ml="2" fontSize="sm">
                    List View
                  </Text>
                </Center>
              </Flex>
            )}
          </Flex>
        </ToolTip>
      </Flex>
      {handleGridForm()}
    </BoxWrapper>
  )
}

export default EventBox
