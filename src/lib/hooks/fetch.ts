export const fetchResult = async (target: string) => {
  const url = `/data/${target}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}
