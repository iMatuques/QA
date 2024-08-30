describe('home', () => {
    it('web app deve estar online', () => {
      cy.visit('/')
  
      cy.title().should('eq', 'Gerencie suas tarefas com Mark L') //validando de o titulo esta correto
    })
  })