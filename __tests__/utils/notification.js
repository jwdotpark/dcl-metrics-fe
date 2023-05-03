import fetchMock from "jest-fetch-mock"

describe("sendNotification", () => {
  const URI = "http://example.com/notification"
  const headers = { "Content-Type": "application/json" }

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("should send a notification with the correct message and payload", async () => {
    const res = 200
    const name = "test"
    const status = "success"
    const expectedMessage = `${name} endpoint request is ${res.toString()}`
    const expectedPayload = { status }

    await sendNotification(res, name, status)

    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual(URI)
    expect(fetchMock.mock.calls[0][1]).toEqual({
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        level: "warning",
        message: expectedMessage,
        payload: expectedPayload,
      }),
    })
  })

  it("should log any errors thrown by fetch", async () => {
    fetchMock.mockRejectOnce(new Error("Network error"))

    const spyConsoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})

    await sendNotification(500, "test", "failure")

    expect(spyConsoleError).toHaveBeenCalledWith(new Error("Network error"))

    spyConsoleError.mockRestore()
  })
})
