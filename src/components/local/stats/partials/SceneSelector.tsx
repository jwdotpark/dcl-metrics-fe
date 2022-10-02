import { Text, Box, Select, useColorModeValue } from "@chakra-ui/react"
import { ChangeEvent, Key } from "react"

const SceneSelector = ({ res, selectedScene, setSelectedScene, name }) => {
  const sceneNames = res.map((scene: { name: string }) => scene.name)

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedScene(e.target.value)
  }

  return (
    <Box pt="4">
      <Select onChange={(e) => handleChange(e)}>
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
