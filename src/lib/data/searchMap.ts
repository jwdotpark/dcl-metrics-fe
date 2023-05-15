interface Tile {
  scene: {
    name: string
  }
}

export const searchTiles = (
  tiles: Record<string, Tile>,
  keyword: string
): Tile[] => {
  if (!keyword) {
    return []
  }

  const searchResult: Tile[] = []
  const seenNames = new Set<string>()

  Object.values(tiles).filter((tile) => {
    if (tile.scene) {
      if (tile.scene.name.toLowerCase().includes(keyword.toLowerCase())) {
        if (!seenNames.has(tile.scene.name)) {
          searchResult.push(tile)
          seenNames.add(tile.scene.name)
        }
      }
    }
  })

  return searchResult
}
