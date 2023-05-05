/* eslint-disable */
/// <reference types="Cypress" />

describe("Index page", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("should render sidebar", () => {
    // sidebar
    cy.findByText("Global").should("be.visible")
    cy.findByText("Users").should("be.visible")
    cy.findByText("Scenes").should("be.visible")
    cy.findByText("Parcels").should("be.visible")
    cy.findByText("Status").should("be.visible")
    cy.findByText("Blog").should("be.visible")
    cy.findByText("Roadmap").should("be.visible")
    cy.findByText("About").should("be.visible")

    // main, children of sidebar
    cy.findAllByText("Unique Visitors").should("be.visible")
    cy.findAllByText("Parcel Visitors").should("be.visible")
    cy.findAllByText("Scenes Visited").should("be.visible")
    cy.findAllByText("Online Users").should("be.visible")
    cy.findAllByText("Active Users").should("be.visible")
    cy.findAllByText("Land Picker").should("be.visible")
    cy.findAllByText("Land Sales").should("be.visible")
    cy.findAllByText("Rentals Daily").should("be.visible")
    cy.findAllByText("Rentals Total").should("be.visible")
    cy.findAllByText("Top Market Deals").should("be.visible")
  })
})

export {}
