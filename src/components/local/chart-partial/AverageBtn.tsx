/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Text, useColorModeValue } from "@chakra-ui/react"
import { lineChartAtom } from "../../../lib/state/lineChartState"
import { useAtom } from "jotai"

const AverageBtn = () => {
  const [chartProp, setChartProp] = useAtom(lineChartAtom)
  console.log(chartProp.toggleMarker)

  return (
    <>asdf</>
    //<Button
    //  mr="2"
    //  bg={
    //    toggleMarker
    //      ? useColorModeValue("gray.300", "gray.500")
    //      : useColorModeValue("gray.100", "gray.700")
    //  }
    //  border={useColorModeValue("gray.200", "gray.600")}
    //  borderRadius="md"
    //  shadow="md"
    //  onClick={() => {
    //    setLineChartState({
    //      ...lineChartState,
    //      toggleMarker: !toggleMarker,
    //    })
    //  }}
    //  size="xs"
    //  variant="solid"
    //>
    //  <Text>Avg.</Text>
    //</Button>
  )
}

export default AverageBtn
