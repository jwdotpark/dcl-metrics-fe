describe("/parcels page", () => {
  beforeEach(() => {
    cy.visit("/parcels")
  })

  it("should be rendered properly", () => {
    cy.findByText("Parcels Average Time Spent").should("be.visible")
    cy.findByText("Parcels with Most Logins").should("be.visible")
    cy.findByText("Parcels with Most AFK").should("be.visible")
    cy.findByText("Parcels with Most Logouts").should("be.visible")
    cy.findByText("Most Visited Parcel").should("be.visible")
  })

  describe("Parcels Average Time Spent component", () => {
    it("has its properties", () => {
      cy.findAllByText("Scenes Map").should("be.visible")
      cy.findAllByText("Coord").should("be.visible")
      cy.findAllByText("AVG Time Spent").should("be.visible")
      const avgTimeSpentTable = cy.get(
        ":nth-child(1) > .chakra-table__container"
      )
      avgTimeSpentTable.should("be.visible")
    })

    it("has date range buttons group", () => {
      const button90d = cy.contains("button", "90d").eq(0)
      button90d.should("be.visible")
      const button1d = cy.contains("button", "1d").eq(0)
      button1d.should("be.visible")

      const value90d = cy.get('tr[role="row"] b').eq(0)
      button90d.click()
      const value1d = cy.get('tr[role="row"] b').eq(0)
      expect(value90d).not.to.equal(value1d)
    })
  })

  describe("Parcels with Most Logins", () => {
    it("has its properties", () => {
      cy.findAllByText("Logins").should("be.visible")
    })

    it("has date range buttons group", () => {
      const button90d = cy.get("div.umami--click--parcels_logins button").eq(3)
      button90d.should("be.visible")
      const button1d = cy.get("div.umami--click--parcels_logins button").eq(0)
      button1d.should("be.visible")

      const value90d = cy.get('td[role="gridcell"] b').eq(5)
      button90d.click()
      const value1d = cy.get('td[role="gridcell"] b').eq(5)
      expect(value90d).not.to.equal(value1d)
    })
  })

  describe("Parcels with Most AFK", () => {
    it("has its properties", () => {
      cy.findAllByText("AVG. AFK").should("be.visible")
    })

    it("has date range buttons group", () => {
      const button90d = cy
        .get("div.umami--click--parcels_afk_time_spent button")
        .eq(0)
      button90d.should("be.visible")
      const button1d = cy.get('div[role="group"] button').eq(8)
      button1d.should("be.visible")

      const value90d = cy.get('td[role="gridcell"] b').eq(10)
      button90d.click()
      const value1d = cy.get('td[role="gridcell"] b').eq(10)
      expect(value90d).not.to.equal(value1d)
    })
  })

  describe("Parcels with Most Logouts", () => {
    it("has its properties", () => {
      cy.findAllByText("Logouts").should("be.visible")
    })

    it("has date range buttons group", () => {
      const button90d = cy
        .get("div.umami--click--parcels_afk_time_spent button")
        .eq(3)
      button90d.should("be.visible")
      const button1d = cy.get('div[role="group"] button').eq(12)
      button1d.should("be.visible")

      const value90d = cy.get('td[role="gridcell"] b').eq(15)
      button90d.click()
      const value1d = cy.get('td[role="gridcell"] b').eq(15)
      expect(value90d).not.to.equal(value1d)
    })
  })

  describe("Most Visited Parcel", () => {
    it("has its properties", () => {
      cy.findAllByText("Visit Count").should("be.visible")
    })

    it("has date range buttons group", () => {
      const button90d = cy
        .get("div.umami--click--parcels_most_visited_parcel button")
        .eq(3)
      button90d.should("be.visible")
      const button1d = cy.get('div[role="group"] button').eq(16)
      button1d.should("be.visible")

      const value90d = cy.get('td[role="gridcell"] b').eq(20)
      button90d.click()
      const value1d = cy.get('td[role="gridcell"] b').eq(20)
      expect(value90d).not.to.equal(value1d)
    })
  })
})

export {}
