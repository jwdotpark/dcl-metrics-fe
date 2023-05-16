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
  })

  describe("Top 50 Scenes component", () => {
    it("should be rendered properly", () => {
      const top50SceneTable = cy.get(".css-1q361w3")
      top50SceneTable.scrollIntoView().should("be.visible")
    })

    it("has its properties", () => {
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

      const scene = cy.get('a[target="_blank"]').eq(0)
      scene.should("have.attr", "href")
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
  })

  describe("Sub components", () => {
    it("should be rendered properly", () => {
      const uniqueVisitorTable = cy.get(".css-17bgf2u > :nth-child(1)")
      const avgTimeSpentTable = cy.get(".css-17bgf2u > :nth-child(2)")
      const mostLoginsTable = cy.get(".css-17bgf2u > :nth-child(3)")
      const mostLogoutsTable = cy.get(".css-17bgf2u > :nth-child(4)")
      const afkTimeSpentTable = cy.get(".css-17bgf2u > :nth-child(5)")

      uniqueVisitorTable.scrollIntoView().should("be.visible")
      avgTimeSpentTable.scrollIntoView().should("be.visible")
      mostLoginsTable.scrollIntoView().should("be.visible")
      mostLogoutsTable.scrollIntoView().should("be.visible")
      afkTimeSpentTable.scrollIntoView().should("be.visible")
    })

    it("has its properties", () => {
      cy.findAllByText("Scenes Map").should("be.visible")
      cy.findAllByText("Name").should("be.visible")
      cy.findAllByText("Visit Count").should("be.visible")
      cy.findAllByText("AVG Time Spent").should("be.visible")
      cy.findAllByText("Logins").should("be.visible")
      cy.findAllByText("Logouts").should("be.visible")
      cy.findAllByText("Time Spent AFK").should("be.visible")

      const scene = cy.get(
        ":nth-child(1) > .chakra-table__container > .chakra-table > tbody.css-0 > :nth-child(1) > :nth-child(2) > a"
      )
      scene.should("have.attr", "href")
    })
  })
})

export {}
