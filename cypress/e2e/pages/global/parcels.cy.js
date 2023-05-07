describe("/parcels page", () => {
  beforeEach(() => {
    cy.visit("/parcels")
  })

  it("should be rendered", () => {
    cy.findByText("Parcels Average Time Spent").should("be.visible")
    cy.findByText("Parcels with Most Logins").should("be.visible")
    cy.findByText("Parcels with Most AFK").should("be.visible")
    cy.findByText("Parcels with Most Logouts").should("be.visible")
    cy.findByText("Most Visited Parcel").should("be.visible")
  })

  it("has components that component properties", () => {
    cy.findAllByText("Scenes Map").should("be.visible")
    cy.findAllByText("Coord").should("be.visible")
    cy.findAllByText("AVG Time Spent").should("be.visible")
  })

  it("has Parcels With Most Logins component properties", () => {
    cy.findAllByText("Logins").should("be.visible")
  })
})

export {}
