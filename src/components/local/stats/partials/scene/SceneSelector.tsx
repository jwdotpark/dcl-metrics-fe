import { Text, Box, Select, useColorModeValue } from "@chakra-ui/react"
import { ChangeEvent, Key } from "react"

const SceneSelector = ({ res, selectedScene, setSelectedScene, name }) => {
  const sceneNames = res.map((scene: { name: string }) => scene.name)

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedScene(e.target.value)
  }

  const selectorName = "scenes_BIG_component"
  const umamiEvent = `umami--click--${selectorName}`

  return (
    <Box mb="2">
      <Select
        className={umamiEvent}
        border="2px solid"
        borderColor={useColorModeValue("gray.100", "gray.500")}
        borderRadius="xl"
        shadow="md"
        onChange={(e) => handleChange(e)}
        variant="filled"
      >
        {sceneNames.map((name: string, i: number) => (
          <option key={i} value={i}>
            <Text>{name}</Text>
          </option>
        ))}
      </Select>
    </Box>
  )
}

export default SceneSelector
