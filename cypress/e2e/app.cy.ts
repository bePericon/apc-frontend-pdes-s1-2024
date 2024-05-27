/// <reference types="cypress" />
// @ts-check
describe('Login failed because backend is off-line', () => {
    it('should navigate to the about page', () => {
        cy.visit('/')

        cy.get('h2').contains('Asesor Personal de Compras')

        cy.get('input[name=email]').type('ucomprador@email.com')
        cy.get('input[name=password]').type('12345678')

        cy.get('button[name=btn-login]').click()

        cy.get('[id=text-alert]').contains('Ha ocurrido un error de conexión.')
    })
})
