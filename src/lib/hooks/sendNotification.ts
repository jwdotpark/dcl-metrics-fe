const URI = "https://dcl-metrics-bot-server.herokuapp.com/telegram/internal"
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
}

// server
export const sendNotification = async (response, name, status) => {
  const data = await fetch(URI, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      level: "warning",
      message: `${name} endpoint request is ${response.status} - ${status}`,
      payload: {
        status: response.status,
      },
    }),
  })
  await data.json()
}

// client
export const sendError = async (error, errorInfo) => {
  const data = await fetch(URI, {
    method: "POST",
    headers: headers,
    mode: "no-cors",
    body: JSON.stringify({
      level: "Error",
      message: `${error} - ${errorInfo.componentStack.toString()}`,
      payload: {
        status: error,
      },
    }),
  })
  await data.json()
}
