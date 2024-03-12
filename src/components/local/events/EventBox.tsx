import { Center, Flex, Text, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { FiGrid, FiList } from "react-icons/fi"
import BoxTitle from "../../layout/local/BoxTitle"
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
      <Flex
        ml="0"
        px="4"
        py="1"
        fontSize="sm"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        borderRadius="md"
        shadow="md"
        _hover={{
          shadow: "lg",
          borderColor: useColorModeValue("gray.100", "gray.600"),
        }}
      >
        <ToolTip label="Change View">
          <Flex
            _hover={{ cursor: "pointer" }}
            onClick={() => handleGridFormChange()}
          >
            {grid === "grid" ? (
              <Flex direction="row">
                <Center>
                  <FiList />
                  <Text ml="2">List</Text>
                </Center>
              </Flex>
            ) : (
              <Flex direction="row">
                <Center>
                  <FiGrid />
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
      <BoxTitle
        name="Every Event in Decentraland"
        description="A list of Events deployed or will be deployed to Decentraland"
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <EventFilter categories={categories} HandleView={HandleView} />
      {handleGridForm()}
    </BoxWrapper>
  )
}

export default EventBox
