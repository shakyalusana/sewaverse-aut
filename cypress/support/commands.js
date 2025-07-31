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

Cypress.Commands.add('validcredentials', (email, password) => {
    cy.intercept('POST', '/api/auth/callback/credentials?').as('LoginRequest');
    
    cy.get('input[placeholder="Email address"]').clear().type(email);
    cy.get('input[placeholder="Password"]').clear().type(password);

    cy.get('form').then(($form) => {
      expect($form[0].checkValidity()).to.be.true;
    });

    cy.get('button[type="submit"]').click();

    cy.wait('@LoginRequest').then((interception) => {
      console.log(interception.response);
      expect(interception.response.body.url).to.eq('https://qc.sewaverse.com/login');
    })
})

Cypress.Commands.add('logout', () => {
  cy.wait(10000);

  cy.window().its('document.readyState').should('eq', 'complete');
  cy.get('button[aria-haspopup="menu"]').first().click();
  
  cy.contains('button[type="submit"]', 'Log Out').filter(':visible').first().click();
  cy.pause(3000);

  // cy.url().should('eq','https://qc.sewaverse.com/login');
});
