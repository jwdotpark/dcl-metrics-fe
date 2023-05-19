export const searchTiles = (tiles: {}, keyword: string) => {
  if (!keyword) {
    return []
  }

  let searchResult = []
  const seenNames = new Set()

  Object.values(tiles).filter((tile: any) => {
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
