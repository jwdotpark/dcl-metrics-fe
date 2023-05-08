describe("/scenes/name/uuid page", () => {
  beforeEach(() => {
    cy.visit("/scenes")
    const name = "tominoya"
    const uuid = "0d36e195-a50f-46a9-b7ef-4de3599649e0"
    cy.visit(`/scenes/${name}/${uuid}`)
  })

  it("is rendered properly", () => {
    const update = cy.get(".css-azx95j > .chakra-text")
    update.contains("Last Update").should("be.visible")
    cy.findAllByText("Unique Visitors").should("be.visible")

    const mapImage = cy.get('img[alt="map image"]')
    mapImage.should("be.visible")

    const statTable = cy.get("div.css-cynvce div").eq(1)
    statTable.should("be.visible")

    const heatmap = cy.get(".css-15rh87x")
    heatmap.should("be.visible")

    const lineChart = cy.get(".css-12f9oax")
    lineChart.should("be.visible")

    const marathonUser = cy.get(".css-h94677")
    marathonUser.should("be.visible")

    const barChart = cy.get(".css-1014bx4")
    barChart.should("be.visible")
  })

  describe("Unique Visitors history chart", () => {
    it("has date range buttons", () => {
      const oldChart = cy.get(".css-18nfyt1")
      const button1d = cy.get(
        ".chakra-stack > .chakra-button__group > :nth-child(1)"
      )
      button1d.should("be.visible")
      button1d.click({ force: true })
      const newChart = cy.get(".css-18nfyt1")
      expect(oldChart).not.to.equal(newChart)
    })
    
    it("has value popup on hover", () => {
      cy.get(".css-18nfyt1")
        .trigger("mouseover")
        .get("[data-testid='slice-tooltip']")
        .should("be.visible")
    })
  })
})
