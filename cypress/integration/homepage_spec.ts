describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('successfully loads', () => {
  })

  it('has the NanoClocks brand name', () => {
    cy.get('header').contains(`NanoClocks`)
  })

  it('has a welcome message', () => {
    cy.get('.message').contains(`Welcome to NanoClocks`)
  })

  it('has an input field for entering a price', () => {
    cy.get('input').should('have.id', 'price-input-field')
  })

  it('has a label for the input field', () => {
    cy.get('label').contains(`Enter a price in $USD`)
  })

  it('has a button for submitting a price', () => {
    cy.get('button').should('have.id', 'price-submit-button')
  })
})
