/// <reference types="cypress" />

describe('Ongs', () => {
    it('Devem poder realizar um cadastro', () => {

        cy.visit('http://localhost:3000/register');

        // cy.get - busca um elemento
        // .type - insere um texto
        cy.get('[data-cy=name]').type('Meu Pet');
        cy.get('[data-cy=email]').type('pet@email.com');
        cy.get('[data-cy=whatsapp]').type('81999999999');
        cy.get('[data-cy=city]').type('Carpina');
        cy.get('[data-cy=uf]').type('PE');

        // routing 
        // start server com cy.server()
        // criar uma rota com cy.route()
        // atribuir rota a um alias
        // esperar com cy.wait() e fazer uma validação

        cy.route('POST', '**/ongs').as('postOng');

        cy.get('[data-cy=submit]').click();

        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).to.equal(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    });

    it('Deve poder realizar login no sistema', () => {

        cy.visit("http://localhost:3000/");
        cy.get('input').type(Cypress.env('createdOngId'))
        cy.get('.button').click()
    });
});