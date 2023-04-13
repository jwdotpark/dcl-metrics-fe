import { Box } from "@chakra-ui/react"

const DelegatorsModalBody = ({ delegators }) => {
  // TODO add profile picture, name and vp
  return (
    <>
      {delegators.map((item) => {
        return <Box key={item}>{item}</Box>
      })}
    </>
  )
}

export default DelegatorsModalBody
