// Adicionando o comando fillMandatoryFieldsAndSubmit

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', project => {
    const LongText = "Me faça um pix agora mesmo!"
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('gabriel@gmail.com')
    cy.get('#open-text-area').type(LongText, { delay: 0 })

    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })
