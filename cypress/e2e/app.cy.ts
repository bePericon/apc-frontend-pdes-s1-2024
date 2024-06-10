/// <reference types="cypress" />
// @ts-check
describe('Login', () => {
    it('should when complete form enabled button "INICIAR SESIÓN"', () => {
        cy.visit('/')

        cy.contains('Asesor Personal de Compras')

        cy.get('input[name=email]').type('ucomprador@email.com')
        cy.get('input[name=password]').type('12345678')

        cy.get('button[name=btn-login]').should('not.be.disabled')
    })

    it('should when complete only email field hold disabled button "INICIAR SESIÓN"', () => {
        cy.visit('/')

        cy.contains('Asesor Personal de Compras')

        cy.get('input[name=email]').type('ucomprador@email.com')

        cy.get('button[name=btn-login]').should('be.disabled')
    })
})

describe('Login navigation', () => {
    it('should navigate to the about page', () => {
        cy.visit('/')

        cy.contains('Asesor Personal de Compras')

        cy.get('input[name=email]').type('ucomprador@email.com')
        cy.get('input[name=password]').type('12345678')

        cy.get('button[name=btn-login]').click()

        cy.contains('¿En qué podemos ayudarte?')
    })
})
