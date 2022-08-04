// @ts-nocheck
import { useState } from "react"
import dynamic from "next/dynamic"
import { GridItem, useDisclosure } from "@chakra-ui/react"
import PopupModal from "../local/PopupModal"
const BarChart = dynamic(() => import("../../lib/BarChart"), {
  ssr: false,
})

const BarChartComponent = ({ data }) => {
  const box = {
    h: "500",
    w: "100%",
    bg: "white",
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState("")

  return (
    <GridItem h={box.h} bg={box.bg} borderRadius="md">
      <BarChart data={data} onOpen={onOpen} value={value} setValue={setValue} />
      <PopupModal
        isOpen={isOpen}
        onClose={onClose}
        value={value}
        modal={true}
      />
    </GridItem>
  )
}

export default BarChartComponent
