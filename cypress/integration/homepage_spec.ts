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

  it('captures the price entered by the user', () => {
    cy.get('input').type('10.00')
    cy.get('input').should('have.value', '10.00')
  })

  it('clears the input value when the user hits enter', () => {
    cy.get('input').type('10.00{enter}')
    cy.get('input').should('have.value', '')
  })

  it('clears the input value when the user clicks the submit button', () => {
    cy.get('input').type('10.00')
    cy.get('button').click()
    cy.get('input').should('have.value', '')
  })

  it('displays the clock summary when the user submits a price', () => {
    cy.get('input').type('10.00{enter}')
    cy.get('.clock-summary').contains(`It has been approximately`)
    cy.get('.clock-summary').contains(`$10`)
    cy.get('input').type('21.10')
    cy.get('button').click()
    cy.get('.clock-summary').contains(`It has been approximately`)
    cy.get('.clock-summary').contains(`$21.10`)
  })

  it('displays the clock when the user submits a price', () => {
    cy.get('input').type('10.00{enter}')
    cy.get('.clock-display').contains(/[0-9]/)
    cy.get('input').type('21.10')
    cy.get('button').click()
    cy.get('.clock-display').contains(/[0-9]/)
  })
})
