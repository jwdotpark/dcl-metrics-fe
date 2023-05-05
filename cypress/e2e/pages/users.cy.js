/* eslint-disable */
/// <reference types="Cypress" />

describe("User page", () => {
  beforeEach(() => {
    cy.visit("/users")
  })

  it("should be rendered", () => {
    cy.findByText("Marathon Users").should("be.visible")
    cy.findByText("Explorers").should("be.visible")
  })

  it("has marathon users component properties", () => {
    cy.findAllByText("Time Spent").should("be.visible")
    cy.findAllByText("User").should("be.visible")
    cy.findAllByText("Address").should("be.visible")
    cy.findAllByText("Link").should("be.visible")
  })

  it("has explorers component properties", () => {
    cy.findAllByText("Parcel Visited").should("be.visible")
    cy.findAllByText("User").should("be.visible")
    cy.findAllByText("Address").should("be.visible")
    cy.findAllByText("Link").should("be.visible")
  })
})

export {}
