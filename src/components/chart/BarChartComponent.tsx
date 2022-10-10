// @ts-nocheck
import { useState } from "react"
import dynamic from "next/dynamic"
import { GridItem, useDisclosure, useColorModeValue } from "@chakra-ui/react"
const BarChart = dynamic(() => import("../../lib/BarChart"), {
  ssr: false,
})

const BarChartComponent = ({ data }) => {
  const box = {
    h: "530",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState("")

  return (
    <GridItem h={box.h} bg={box.bg} borderRadius="xl">
      <BarChart data={data} onOpen={onOpen} value={value} setValue={setValue} />
    </GridItem>
  )
}

export default BarChartComponent
