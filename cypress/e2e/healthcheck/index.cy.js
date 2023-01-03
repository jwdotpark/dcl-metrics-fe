/// <reference types="cypress" />

describe("Index page", () => {
  it("should display components", () => {
    cy.visit("http://localhost:3000/")
    cy.contains("Unique Visitors")
    cy.contains("Parcels Visitors")
    cy.contains("Scenes Visited")
    cy.contains("Land Picker")
    cy.contains("Marathon Users")
    cy.contains("Explorers")
    cy.contains("Scenes")
    cy.contains("Scenes with Most Unique Visitors")
    cy.contains("Scenes with AVG Time Spent")
    cy.contains("Parcels Average Time Spent")
    cy.contains("Most Visited Parcel")
  })
})
