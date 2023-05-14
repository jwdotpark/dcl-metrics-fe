import SceneParcelsHeatmap from "./SceneParcelsHeatmap"

const SceneStats = ({ res, selectedScene, setSelectedScene }) => {
  const { parcels_heatmap } = res[selectedScene]

  return (
    <SceneParcelsHeatmap data={parcels_heatmap} selectedScene={selectedScene} />
  )
}

export default SceneStats
