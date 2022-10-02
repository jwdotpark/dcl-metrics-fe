import { Text, Box, Select } from "@chakra-ui/react"
import { ChangeEvent, Key } from "react"

const SceneSelector = ({ res, selectedScene, setSelectedScene }) => {
  const sceneNames = res.map((scene: { name: string }) => scene.name)

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedScene(e.target.value)
  }

  return (
    <Box mb="4">
      <Select onChange={(e) => handleChange(e)}>
        {sceneNames.map((name: string, i: number) => (
          <option key={i} value={i}>
            {i + 1 + ". " + name}
          </option>
        ))}
      </Select>
    </Box>
  )
}

export default SceneSelector
