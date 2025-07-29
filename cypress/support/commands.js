// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// const, var, let
// int, char a = 'a


Cypress.Commands.add('bypassLogin', ({ email, password }) => {
    const emailEl = cy.get('main form div .space-y-2 input[placeholder="Email address"]')
    const passwordEl = cy.get('main form div .space-y-2 input[placeholder="Password"]')

    const logIn = cy.get('main form button[type="submit"]')

    emailEl.type(email)
    passwordEl.type(password)
    logIn.click()

    // cy.url().should('include', '/dashboard')
    emailEl.clear()
})

