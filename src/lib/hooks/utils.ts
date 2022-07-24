export const convertSeconds = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
  const min = Math.floor((seconds % 3600) / 60)
  const sec = Math.floor(seconds % 60)
  return `${hrs}hrs ${min}min ${sec}s`
}
