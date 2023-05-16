describe("Index page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("should be rendered", () => {
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
    const testSubComponent = (subComponentName, dataTestId) => {
      it(subComponentName, () => {
        const subComponent = cy.get(`[data-testid="${dataTestId}"]`)
        subComponent.should("be.visible")

        const buttons = cy.get(`div[data-testid="${dataTestId}"] button`)
        //buttons.should("have.length", 3).and("be.visible")

        let initialCount

        subComponent.should(($el) => {
          initialCount = $el.text().trim()
        })

        buttons.eq(1).click({ force: true })

        subComponent.should(($el) => {
          const updatedCount = $el.text().trim()
          expect(updatedCount).not.to.equal(initialCount)
        })
      })
    }

    testSubComponent("Unique Visitors", "uniqueVisitors")
    testSubComponent("Parcel Visitors", "parcelVisitors")
    testSubComponent("Scenes Visited", "scenesVisited")
    testSubComponent("Land Sales", "landSales")
    testSubComponent("Rentals Daily", "rentalDaily")
  })

  describe("Sidebar", () => {
    it("renders sidebar list", () => {
      cy.findByText("Global").should("be.visible")
      cy.findByText("Users").should("be.visible")
      cy.findByText("Scenes").should("be.visible")
      cy.findByText("Parcels").should("be.visible")
      cy.findByText("Status").should("be.visible")
      cy.findByText("Blog").should("be.visible")
      cy.findByText("Roadmap").should("be.visible")
      cy.findByText("About").should("be.visible")
    })

    it("can be collapsed and adjust the width accordingly", () => {
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
