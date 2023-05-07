describe("/scenes page", () => {
  beforeEach(() => {
    cy.visit("/scenes")
  })

  it("should be rendered properly", () => {
    cy.findByText("Top 50 Scenes").should("be.visible")
    cy.findByText("Scenes with Most Unique Visitors").should("be.visible")
    cy.findByText("Scenes with AVG Time Spent").should("be.visible")
    cy.findByText("Scenes with Most Logins").should("be.visible")
    cy.findByText("Scenes with Most Logouts").should("be.visible")
    cy.findByText("Scenes with AFK Time Spent").should("be.visible")

    const top50SceneTable = cy.get(".css-hp15d1 > :nth-child(1)")
    top50SceneTable.scrollIntoView().should("be.visible")
  })

  it("has Top 50 Scenes and its properties", () => {
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

  it("Top 50 Scenes pagination button group", () => {
    const paginationBtnGroup = cy.get(".css-1xxacki > .chakra-button__group")
    const top50SearchInput = cy.get(".css-0 > .chakra-input")

    paginationBtnGroup.should("be.visible")
    top50SearchInput.should("be.visible")

    const nextBtn = cy.get(
      ".css-1xxacki > .chakra-button__group > :nth-child(4)"
    )
    nextBtn.should("be.visible")
    nextBtn.click()

    const listing = cy.get(
      "tbody.css-0 > :nth-child(1) > :nth-child(1) > .chakra-text"
    )
    listing.contains("11")

    const prevBtn = cy.get(
      "tbody.css-0 > :nth-child(1) > :nth-child(1) > .chakra-text"
    )
    prevBtn.should("be.visible")
    prevBtn.click()

    listing.contains("1")
  })

  it("has Most Unique Visitor and its properties", () => {
    cy.findAllByText("Scenes Map").should("be.visible")
    const dateRangeBtnGroup = cy.get(
      ":nth-child(1) > .css-1hjorte > .css-yaroy6 > .chakra-stack > .chakra-button__group"
    )
    dateRangeBtnGroup.should("be.visible")

  })
})

export {}
