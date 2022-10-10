import { Text, Box, Select, useColorModeValue } from "@chakra-ui/react"
import { ChangeEvent, Key } from "react"

const SceneSelector = ({ res, selectedScene, setSelectedScene, name }) => {
  const sceneNames = res.map((scene: { name: string }) => scene.name)

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedScene(e.target.value)
  }

  return (
    <Box>
      <Select
        border="2px solid"
        borderColor="gray.300"
        shadow="md"
        // bgColor="gray.200"
        onChange={(e) => handleChange(e)}
        // variant="filled"
      >
        {sceneNames.map((name: string, i: number) => (
          <option key={i} value={i}>
            <Text>{i + 1 + ". " + name}</Text>
          </option>
        ))}
      </Select>
    </Box>
  )
}

export default SceneSelector
