/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('gabriel@gmail.com')
        cy.get('#open-text-area').type("Me faça um pix agora mesmo!")

        cy.get('.button').click()
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('gabriel.com')

        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    });
})