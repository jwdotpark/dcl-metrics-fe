export const fetchResult = async (target: string) => {
  const url = `/data/${target}`
  // const url = "https://dclund.herokuapp.com/api/user_stats/time_spent/daily"
  const response = await fetch(url)
  const data = await response.json()
  return data
}
