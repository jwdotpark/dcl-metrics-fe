import { Flex, Box, Spacer } from "@chakra-ui/react"
import { useState } from "react"
import { FiGrid, FiList } from "react-icons/fi"
import BoxWrapper from "../../layout/local/BoxWrapper"
import ToolTip from "../../layout/local/ToolTip"
import EventCardGrid from "./EventCardGrid"

const EventBox = ({ data }) => {
  const [grid, setGrid] = useState("grid")

  const EventCardList = () => {
    return <Box>List</Box>
  }

  const handleGridForm = () => {
    switch (grid) {
      case "grid":
        return <EventCardGrid data={data} />
      case "list":
        return <EventCardList />
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
        <Spacer />
        <ToolTip label="Change View">
          <Flex
            direction="row"
            gap="2"
            mr="1"
            onClick={() => handleGridFormChange()}
          >
            {grid === "grid" ? <FiGrid /> : <FiList />}
          </Flex>
        </ToolTip>
      </Flex>
      {handleGridForm()}
    </BoxWrapper>
  )
}

export default EventBox
