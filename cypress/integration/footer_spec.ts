describe('The Footer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has a social media message', () => {
    cy.get('.footer-message').contains(`Join The Conversation`)
  })

  it('has a link to the nanocurrency sub-reddit', () => {
    cy.get('.reddit').should('have.attr', 'href',
      'https://www.reddit.com/r/nanocurrency')
  })

  it('has a link to the nanocurrency twitter account', () => {
    cy.get('.twitter').should('have.attr', 'href',
      'https://twitter.com/nano?lang=en')
  })

  it('has a link to the nanocurrency discord', () => {
    cy.get('.discord').should('have.attr', 'href',
      'https://discordapp.com/invite/JphbBas')
  })

  it('has a link to the nanocurrency medium page', () => {
    cy.get('.medium').should('have.attr', 'href',
      'https://medium.com/nanocurrency')
  })

  it('has a link to the nanocurrency github', () => {
    cy.get('.github').should('have.attr', 'href',
      'https://github.com/nanocurrency')
  })
})
