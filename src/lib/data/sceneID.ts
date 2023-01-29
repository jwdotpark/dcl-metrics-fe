export const sceneID = {
  edifice: {
    name: "edifice-metaversal",
    uuid: "5d087145-e02a-4c19-9c39-87c05279c1dc",
  },
  kb_homes: {
    name: "kb_homes",
    uuid: "94d98b8e-c006-4cd9-baff-1a7d6ecc2f11",
  },
}

export const findUUID = (name: string) => {
  for (const scene of Object.values(sceneID)) {
    if (scene.name === name) {
      return scene.uuid
    }
  }
  return null
}
