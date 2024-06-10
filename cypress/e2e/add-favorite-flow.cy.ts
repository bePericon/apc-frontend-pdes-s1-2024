/// <reference types="cypress" />
// @ts-check
describe('Add to favorites', () => {
    it('should after login, search a product, add it to favorites and after delete it', () => {
        cy.visit('/')

        cy.contains('Asesor Personal de Compras')

        cy.get('input[name=email]').type('ucomprador@email.com')
        cy.get('input[name=password]').type('12345678')
        cy.get('button[name=btn-login]').click()

        cy.get('input[placeholder="Buscar en APC..."]').type('Samsung E1272 Dual Sim 32 Mb Rojo 64 Mb Ram')
        cy.get('[name=btn-search]').click()
        cy.get('[data-test-id="card-item-0"]', { timeout: 2000 }).click()

        cy.get('[data-test-id="btn-favorite"]', { timeout: 2000 }).click()
        cy.get('[data-test-id="btn-dialog-close"]').click()

        cy.visit('/apc/favoritos')
    
        cy.contains('Samsung', { timeout: 5000 })
        cy.get('[data-test-id="card-item-0"]', { timeout: 2000 }).click()
    
        cy.get('[data-test-id="btn-favorite"]', { timeout: 2000 }).click()
        
        cy.contains('Samsung E1272 Dual Sim 32 Mb Rojo 64 Mb Ram').not
    })
})