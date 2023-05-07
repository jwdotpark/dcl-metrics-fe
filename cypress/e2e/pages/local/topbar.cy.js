describe("Top bar", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  describe("settings button", () => {
    it("is visible and has elements", () => {
      cy.wait(1000)
      const topBar = cy.get(".css-ojsiut")
      topBar.should("be.visible")
      const psaString = cy.get(".css-0 > .chakra-button > .chakra-text")
      psaString.should("be.visible")
      psaString.should("have.length.gt", 0)

      const colorBtn = cy.get(".css-pdyi1p > :nth-child(6)")
      colorBtn.should("be.visible")
      colorBtn.click()
      // FIXME
      const sidebar = cy.get(
        ":nth-child(1) > .css-1gvendp > .css-8atqhb > .css-1ps8lhz"
      )
      sidebar.should("be.visible")
      colorBtn.click()
    })
  })
})
