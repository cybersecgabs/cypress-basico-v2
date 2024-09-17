/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const LongText = "Me faça um pix agora mesmo!"
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('gabriel@gmail.com')
        cy.get('#open-text-area').type(LongText, { delay: 0 })

        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('gabriel.com')

        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    });

    it('campo telefone vazio quando preenchido com valor inválido', function() {
        cy.get('#phone').type('Teste').should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#phone').type('Teste').should('have.value', '')
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('gabriel@gmail.com')
        cy.get('#open-text-area').type('Me faça um pix agora mesmo!')
        cy.get('#phone-checkbox').click()
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        const LongText = "Me faça um pix agora mesmo!"
        cy.get('#firstName').type('Gabriel').should('have.value', 'Gabriel').clear().should('have.value', '')
        cy.get('#lastName').type('Silva').should('have.value', 'Silva').clear().should('have.value', '')
        cy.get('#email').type('gabriel@gmail.com').should('have.value', 'gabriel@gmail.com').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
    })
    
    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
})