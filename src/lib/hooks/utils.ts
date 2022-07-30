export const convertSeconds = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
  // const min = Math.floor((seconds % 3600) / 60)
  const min =
    Math.floor((seconds % 3600) / 60) < 10
      ? `0${Math.floor((seconds % 3600) / 60)}`
      : Math.floor((seconds % 3600) / 60)
  // express sec with leading zero
  const sec = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60
  // return `${hrs}:${min}:${sec}`

  // const sec = Math.floor(seconds % 60)
  return `${hrs}h ${min}m ${sec}s`
}
