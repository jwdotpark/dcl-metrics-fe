export const sceneID = {
  "edifice-metaversal": "5d087145-e02a-4c19-9c39-87c05279c1dc",
  "kb-home": "94d98b8e-c006-4cd9-baff-1a7d6ecc2f11",
}

export const findUUID = (name: string) => {
  return sceneID[name]
}
