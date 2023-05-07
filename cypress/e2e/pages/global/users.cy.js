describe("/users page", () => {
  beforeEach(() => {
    cy.visit("/users")
  })

  it("should be rendered", () => {
    cy.findByText("Marathon Users").should("be.visible")
    cy.findByText("Explorers").should("be.visible")
  })

  it("has Marathon users and its properties", () => {
    cy.findAllByText("Time Spent").should("be.visible")
    cy.findAllByText("User").should("be.visible")
    cy.findAllByText("Address").should("be.visible")
    cy.findAllByText("Link").should("be.visible")

    // date range button group
    const marathonUserTable = cy.get(":nth-child(1) > .chakra-table__container")
    marathonUserTable.should("be.visible")
    const Name90Day = cy.get("div.css-gmuwbf").eq(0)
    const firstBtn = cy.contains("button", "1d").eq(0)
    firstBtn.should("be.visible")
    firstBtn.click()
    const Name1Day = cy.get("div.css-gmuwbf").eq(0)
    expect(Name90Day).not.to.equal(Name1Day)
  })

  it("has Explorers and its properties", () => {
    cy.findAllByText("Parcels Visited").should("be.visible")
    cy.findAllByText("User").should("be.visible")
    cy.findAllByText("Address").should("be.visible")
    cy.findAllByText("Link").should("be.visible")

    // date range button group
    const explorersTable = cy.get(":nth-child(2) > .chakra-table__container")
    explorersTable.should("be.visible")
    const Name90Day = cy.get("div.css-gmuwbf").eq(10)
    const fistBtn = cy.get("div.umami--click--users_explorers button").eq(0)
    fistBtn.should("be.visible")
    const Name1Day = cy.get("div.css-gmuwbf").eq(10)
    expect(Name90Day).not.to.equal(Name1Day)
  })
})

export {}
