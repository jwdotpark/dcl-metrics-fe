export const sendNotification = async (response, name) => {
  const URI = "https://dcl-metrics-bot-server.herokuapp.com/telegram/internal"
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }

  const data = await fetch(URI, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      level: "warning",
      message: `${name} endpoint request is ${response.status}`,
      payload: {
        status: response.status,
      },
    }),
  })
  await data.json()
}
