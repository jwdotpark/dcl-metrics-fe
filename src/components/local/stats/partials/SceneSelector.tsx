import { Text, Box, Select } from "@chakra-ui/react"

const SceneSelector = ({ res, selectedScene, setSelectedScene }) => {
  // make an array that contains each name property of res
  const sceneNames = res.map((scene) => scene.name)

  return (
    <Box mb="4">
      <Select>
        {sceneNames.map((name: string, i) => (
          <option
            value={name}
            onClick={() => {
              setSelectedScene(i)
            }}
          >
            {i + 1 + ". " + name}
          </option>
        ))}
      </Select>
    </Box>
  )
}

export default SceneSelector
