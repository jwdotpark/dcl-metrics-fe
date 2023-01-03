/// <reference types="cypress" />

describe("Navigation", () => {
  it("should navigate to the pages", () => {
    cy.visit("http://localhost:3000/")

    cy.get('a[href*="users"]').click()
    cy.url().should("include", "/users")

    cy.get('a[href*="scenes"]').click()
    cy.url().should("include", "/scenes")

    cy.get('a[href*="parcels"]').click()
    cy.url().should("include", "/parcels")

    cy.get('a[href*="status"]').click()
    cy.url().should("include", "/status")

    cy.get('a[href*="about"]').click()
    cy.url().should("include", "/about")
  })
})
