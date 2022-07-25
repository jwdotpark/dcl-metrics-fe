export const fetchResult = async (url: any, setRes) => {
  const response = await fetch(url)
  const result = await response.json()
  setRes(result.data)
}
