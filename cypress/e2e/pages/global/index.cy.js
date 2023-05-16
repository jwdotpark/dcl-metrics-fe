describe("Index page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it.skip("should be rendered", () => {
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

  describe("should have sub components", () => {
    it.skip("Unique Visitors", () => {
      const uniqueVisitors = cy.get('[data-testid="uniqueVisitors"]')
      uniqueVisitors.should("be.visible")

      const Btn7d = cy.contains("button", "7d").eq(0)
      const Btn30d = cy.contains("button", "30d").eq(0)
      const Btn90d = cy.contains("button", "90d").eq(0)

      Btn7d.should("be.visible")
      Btn30d.should("be.visible")
      Btn90d.should("be.visible")

      let initialCount

      uniqueVisitors.should((val) => {
        initialCount = val.text().trim()
      })

      cy.contains("button", "7d").eq(0).click({ force: true })

      uniqueVisitors.should((val) => {
        const updatedCount = val.text().trim()
        expect(updatedCount).not.to.equal(initialCount)
      })
    })

    it.skip("Parcel Visitors", () => {
      const parcelVisitors = cy.get('[data-testid="parcelVisitors"]')
      parcelVisitors.should("be.visible")

      const Btn7d = cy.get('div[data-testid="parcelVisitors"] button').eq(0)
      const Btn30d = cy.get('div[data-testid="parcelVisitors"] button').eq(1)
      const Btn90d = cy.get('div[data-testid="parcelVisitors"] button').eq(2)

      Btn7d.should("be.visible")
      Btn30d.should("be.visible")
      Btn90d.should("be.visible")

      let initialCount

      parcelVisitors.should((val) => {
        initialCount = val.text().trim()
      })

      cy.get('div[data-testid="parcelVisitors"] button')
        .eq(1)
        .click({ force: true })

      parcelVisitors.should((val) => {
        const updatedCount = val.text().trim()
        expect(updatedCount).not.to.equal(initialCount)
      })
    })

    it("Scenes Visited", () => {
      const scenesVisited = cy.get('[data-testid="scenesVisited"]')
      scenesVisited.should("be.visible")

      const Btn7d = cy.get('div[data-testid="scenesVisited"] button').eq(0)
      const Btn30d = cy.get('div[data-testid="scenesVisited"] button').eq(1)
      const Btn90d = cy.get('div[data-testid="scenesVisited"] button').eq(2)

      Btn7d.should("be.visible")
      Btn30d.should("be.visible")
      Btn90d.should("be.visible")

      let initialCount

      scenesVisited.should((val) => {
        initialCount = val.text().trim()
      })

      cy.contains("button", "7d").eq(0).click({ force: true })

      scenesVisited.should((val) => {
        const updatedCount = val.text().trim()
        expect(updatedCount).not.to.equal(initialCount)
      })
    })
  })

  describe("Sidebar", () => {
    it.skip("renders sidebar list", () => {
      cy.findByText("Global").should("be.visible")
      cy.findByText("Users").should("be.visible")
      cy.findByText("Scenes").should("be.visible")
      cy.findByText("Parcels").should("be.visible")
      cy.findByText("Status").should("be.visible")
      cy.findByText("Blog").should("be.visible")
      cy.findByText("Roadmap").should("be.visible")
      cy.findByText("About").should("be.visible")
    })

    it.skip("can be collapsed and adjust the width accordingly", () => {
      const wideSideBar = cy.get("div.css-uzcmrh div").eq(36)
      wideSideBar.should("be.visible")
      const collapseBtn = cy.contains("p", "Collapse")
      collapseBtn.should("be.visible")
      const narrowSideBar = cy.get("div.css-uzcmrh div").eq(36)
      collapseBtn.click({ force: true })
      wideSideBar.should("not.equal", narrowSideBar)
    })
  })
})

export {}
