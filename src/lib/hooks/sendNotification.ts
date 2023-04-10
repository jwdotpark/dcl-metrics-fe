const URI = "https://dcl-metrics-bot-server.herokuapp.com/telegram/internal"
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
}

// server
export const sendNotification = async (res, name, status) => {
  try {
    const response = await fetch(URI, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        level: "warning",
        message: `${name} endpoint request is ${res.toString()}`,
        payload: {
          status: status,
        },
      }),
    })
    const responseData = await response.json()
    console.log(responseData)
  } catch (err) {
    console.error(err)
  }
}

// client
export const sendError = async (error, errorInfo) => {
  try {
    const response = await fetch(URI, {
      method: "POST",
      headers: headers,
      mode: "no-cors",
      body: JSON.stringify({
        level: "Error",
        message: `${error} - ${errorInfo.componentStack.toString()}`,
        payload: {
          status: error.toString(),
        },
      }),
    })
    const responseData = await response.json()
    console.log(responseData)
  } catch (error) {
    console.error(error)
  }
}

export const sendFeedback = async (values) => {
  try {
    const response = await fetch(URI, {
      method: "POST",
      headers: headers,
      mode: "no-cors",
      body: JSON.stringify({
        level: "Feedback",
        message: "Message: " + values.msg,
        payload: {
          sender:
            values.name || values.contact
              ? `${values.name && values.name}(${
                  values.contact && values.contact
                })`
              : "Anonymous",
        },
      }),
    })
    const responseData = await response.json()
    console.log(responseData)
  } catch (error) {
    console.log(error)
  }
}
