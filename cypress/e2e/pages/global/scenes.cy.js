describe("/scenes page", () => {
  beforeEach(() => {
    cy.visit("/scenes")
  })

  it("should be rendered", () => {
    cy.findByText("Top 50 Scenes").should("be.visible")
    cy.findByText("Scenes with Most Unique Visitors").should("be.visible")
    cy.findByText("Scenes with AVG Time Spent").should("be.visible")
    cy.findByText("Scenes with Most Logins").should("be.visible")
    cy.findByText("Scenes with Most Logouts").should("be.visible")
    cy.findByText("Scenes with AFK Time Spent").should("be.visible")
    cy.get(".css-hp15d1 > :nth-child(1)").scrollIntoView().should("be.visible")
  })

  it("has top 50 scenes component properties", () => {
    cy.findAllByText("Map").should("be.visible")
    cy.findAllByText("Scene").should("be.visible")
    cy.findAllByText("Visitors").should("be.visible")
    cy.findAllByText("Complete Sessions").should("be.visible")
    cy.findAllByText("Share of Global Visitors").should("be.visible")
    cy.findAllByText("Unique Logins").should("be.visible")
    cy.findAllByText("Unique Logouts").should("be.visible")
    cy.findAllByText("Total Logins").should("be.visible")
    cy.findAllByText("Total Logouts").should("be.visible")
    cy.findAllByText("Average Session Duration").should("be.visible")
    cy.findAllByText("Avg. Time Spent").should("be.visible")
    cy.findAllByText("Avg. Time Spent AFK").should("be.visible")
  })

  it("has top 50 scenes component pagination button group", () => {
    const paginationBtnGroup = cy.get(".css-1xxacki > .chakra-button__group")
    const top50SearchInput = cy.get(".css-0 > .chakra-input")
    const nextBtn = cy.get(
      ".css-1xxacki > .chakra-button__group > :nth-child(4)"
    )
    const prevBtn = cy.get(
      ".css-1xxacki > .chakra-button__group > :nth-child(4)"
    )

    paginationBtnGroup.should("be.visible")
    top50SearchInput.should("be.visible")
    nextBtn.should("be.visible")
    nextBtn.click()
    cy.get(
      "tbody.css-0 > :nth-child(1) > :nth-child(1) > .chakra-text"
    ).contains("11")
    prevBtn.should("be.visible")
    prevBtn.click()
    cy.get(
      "tbody.css-0 > :nth-child(1) > :nth-child(1) > .chakra-text"
    ).contains("1")
  })
})

export {}
