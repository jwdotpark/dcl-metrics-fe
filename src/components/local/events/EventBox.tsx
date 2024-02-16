import { Center, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import { FiGrid, FiList } from "react-icons/fi"
import BoxWrapper from "../../layout/local/BoxWrapper"
import ToolTip from "../../layout/local/ToolTip"
import EventCardGrid from "./EventCardGrid"
import EventCardList from "./EventCardList"
import EventFilter from "./EventFilter"

const EventBox = ({ data, categories }) => {
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

  const HandleView = () => {
    return (
      <Flex mr="4" ml="2">
        <ToolTip label="Change View">
          <Flex
            _hover={{ cursor: "pointer" }}
            onClick={() => handleGridFormChange()}
          >
            {grid === "grid" ? (
              <Flex direction="row">
                <Center>
                  <FiGrid />
                  <Text ml="2">List</Text>
                </Center>
              </Flex>
            ) : (
              <Flex direction="row">
                <Center>
                  <FiList />
                  <Text ml="2">Grid</Text>
                </Center>
              </Flex>
            )}
          </Flex>
        </ToolTip>
      </Flex>
    )
  }

  return (
    <BoxWrapper colSpan="0">
      <EventFilter categories={categories} HandleView={HandleView} />
      {handleGridForm()}
    </BoxWrapper>
  )
}

export default EventBox
