export const convertSeconds = (seconds: number) => {
  const hrs = `0${Math.floor(seconds / 3600)}`.slice(-2)
  const min =
    Math.floor((seconds % 3600) / 60) < 10
      ? `0${Math.floor((seconds % 3600) / 60)}`
      : Math.floor((seconds % 3600) / 60)
  const sec = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60
  return `${hrs}h ${min}m ${sec}s`
}
