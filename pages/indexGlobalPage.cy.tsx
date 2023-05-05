import React from 'react'
import GlobalPage from './index'

describe('<GlobalPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GlobalPage />)
  })
})