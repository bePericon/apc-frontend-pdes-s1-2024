describe('Navigation', () => {
    it('should navigate to the about page', () => {
        // Start from the index page
        cy.visit('/')

        // The new page should contain an h2 with "Asesor Personal de Compras"
        cy.get('h2').contains('Asesor Personal de Compras')
    })
})
