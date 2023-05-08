describe("/users/uuid page", () => {
  beforeEach(() => {
    const uuid = "0x17f5cd83f4133ac380d5628f9ee0669ce5c6fa40"
    cy.visit(`/users/${uuid}`)
  })

  it("is rendered properly", () => {
    cy.get("img.chakra-image").eq(0).should("be.visible")
    cy.findAllByText("User Activity").should("be.visible")
    cy.findAllByText("NFT Activity").should("be.visible")
    cy.findAllByText("DAO Activity").should("be.visible")
    cy.findAllByText("User Time Spent").should("be.visible")
    cy.findAllByText("User Scenes Visited").should("be.visible")
    cy.findAllByText("Frequently Visited Scenes").should("be.visible")

    const name = cy.get(":nth-child(5) > .css-0 > a")
    name.should("be.visible")
    name
      .should("have.prop", "tagName", "A")
      .and("have.attr", "href")
      .and("match", /^(http|https):\/\//)

    const wearable = cy.get(":nth-child(9) > .css-0 > a ")
    wearable.should("be.visible")
    wearable
      .should("have.prop", "tagName", "A")
      .and("have.attr", "href")
      .and("match", /^(http|https):\/\//)

    const land = cy.get(":nth-child(13) > .css-0 > a")
    land.should("be.visible")
    land
      .should("have.prop", "tagName", "A")
      .and("have.attr", "href")
      .and("match", /^(http|https):\/\//)

    const delegators = cy.get(":nth-child(9) > :nth-child(3) > .chakra-button")
    delegators.should("be.visible")
    delegators.click({ force: true })

    const closeBtn = cy.get(".chakra-modal__close-btn")
    closeBtn.should("be.visible")
    closeBtn.click({ force: true })

    cy.wait(300)
    const grant = cy.get(":nth-child(10) > :nth-child(3) > .chakra-button")
    grant.click({ force: true })
    cy.get(".css-958hsk").should("be.visible")
    cy.get(".css-16yqwkq").should("be.visible")
    cy.get("button.chakra-modal__close-btn").click({
      force: true,
    })
    cy.contains("Total Requested").should("not.exist")
  })
})
