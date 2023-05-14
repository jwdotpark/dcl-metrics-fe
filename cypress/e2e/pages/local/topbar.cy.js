describe("Top bar", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("is rendered properly with its elements", () => {
    cy.wait(1000)
    const topBar = cy.get(".css-ojsiut")
    topBar.should("be.visible")
    const psaString = cy.get(".css-0 > .chakra-button > .chakra-text")
    psaString.should("be.visible")
    psaString.should("have.length.gt", 0)
  })

  describe("has buttons", () => {
    it("that changes color", () => {
      const body = cy.get("body")
      body.should("have.class", "chakra-ui-dark")
      const colorBtn = cy.get("[data-testid='colorBtn']")
      colorBtn.should("be.visible")
      colorBtn.click({ force: true })
      cy.wait(1000)
      body.should("have.class", "chakra-ui-light")
    })

    it("that has feedback form", () => {
      const URI =
        "https://dcl-metrics-bot-server.herokuapp.com/telegram/internal"

      cy.intercept("POST", URI, (req) => {
        req.reply({ statusCode: 200, body: { success: true } })
      }).as("formSubmission")

      const feedbackBtn = cy.get("[data-testid='feedbackBtn']")
      feedbackBtn.should("be.visible")
      feedbackBtn.click({ force: true })
      cy.findAllByText("Your Name").should("be.visible")
      cy.findAllByText("Contact").should("be.visible")
      cy.findAllByText("Message").should("be.visible")

      const nameInput = cy.get('input[name="name"]')
      nameInput.should("be.visible")
      nameInput.type("test name")

      const contactInput = cy.get('input[name="contact"]')
      contactInput.should("be.visible")
      contactInput.type("some@email.com")

      const msgInput = cy.get('textarea[data-testid="msg"]')

      msgInput.should("be.visible")
      msgInput.type("e2e test")

      const submitBtn = cy.contains("button", "Send")
      submitBtn.should("be.visible")
      submitBtn.click({ force: true })

      cy.wait("@formSubmission").then((interception) => {
        expect(interception.response.statusCode).to.eq(200)
        expect(interception.response.body.success).to.be.true
      })
    })
  })
})

export {}
