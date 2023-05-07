describe("/map page", () => {
  beforeEach(() => {
    cy.visit("/map")
    cy.viewport(1920, 1080)
  })

  it("should be rendered", () => {
    cy.findByText("Land Picker").should("be.visible")
    const searchInput = cy.get("input#search-input")
    const heatmapBtn = cy.get("button.chakra-menu__menu-button")
    const fullscreenBtn = cy.contains("button", "Fullscreen")
    const collapsibleBtn = cy.get('button[type="button"]').eq(5)

    const xInput = cy.get('input[type="number"]').eq(0)
    const yInput = cy.get('input[type="number"]').eq(1)

    const zoomInBtn = cy.contains("button", "-")
    const zoomOutBtn = cy.contains("button", "+")

    searchInput.should("be.visible")
    heatmapBtn.should("be.visible")
    fullscreenBtn.should("be.visible")
    collapsibleBtn.should("be.visible")
    xInput.should("be.visible")
    yInput.should("be.visible")
    zoomInBtn.should("be.visible")
    zoomOutBtn.should("be.visible")
  })

  it("has coordinate input and sidebar", () => {
    const preMapHeight = cy.get(".css-50a42o > :nth-child(2)")
    const collapsibleBtn = cy.get(".css-185g68i")
    const afterMapHeight = cy.get(".css-50a42o > :nth-child(2)")
    collapsibleBtn.click()
    expect(preMapHeight).not.to.equal(afterMapHeight)

    cy.get('input[type="number"]').eq(0).type("10")
    cy.get('input[type="number"]').eq(1).type("10{enter}")
    cy.get("img.chakra-image").should("be.visible")
    cy.findByText("Coordinate").should("be.visible")
    cy.findByText("Description").should("be.visible")
  })

  it("has lands that opens sidebar when clicked", () => {
    cy.wait(1000)
    cy.get(".react-tile-map-canvas").click(960, 540)
    cy.findByText("Coordinate").should("be.visible")
    cy.findByText("Description").should("be.visible")
  })
})
