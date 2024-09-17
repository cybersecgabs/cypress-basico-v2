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
        cy.get('#phone-checkbox').check()
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

    it('seleciona um produto (Mentoria) por seu (value))', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice)', function() {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('seleciona o radio button de "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        const checkBox = "checkbox"
        cy.get(`input[type="${checkBox}"]`).check();
        cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json').should(function($input){
            expect($input[0].files[0].name).to.eq('example.json')
        })
    })

    it('seleciona um arquivo da pasta fixtures simulando um drag-and-drop', function() {
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }).should(function($input){
            expect($input[0].files[0].name).to.eq('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture("example.json").as("sampleFile")
        cy.get('#file-upload').selectFile('@sampleFile', { action: 'drag-drop' }).should(function($input){
            expect($input[0].files[0].name).to.eq('example.json')
        })
    })
})