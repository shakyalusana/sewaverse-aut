describe('Login Positive Functionality Tests', () => {
  beforeEach(() => {
    cy.visit('https://qc.sewaverse.com/login');
  });

  it('should login successfully with valid credentials', () => {
    cy.fixture('validFormat.json').then((users) => {
      users.forEach(({ email, password, description }) => {
        cy.log(`Testing: ${description}`);
        cy.intercept('POST', '/api/login').as('loginRequest');

        cy.get('input[placeholder="Email address"]').clear().type(email);
        cy.get('input[placeholder="Password"]').clear().type(password);
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');

        cy.url().should('not.include', '/login');
        cy.contains('Welcome').should('exist');
      });
    });
  });

  it('should login successfully by pressing Enter key', () => {
    cy.intercept('POST', '/api/login').as('loginRequest');

        cy.get('input[placeholder="Email address"]').type('lusana2018.shakya@gmail.com');
        cy.get('input[placeholder="Password"]').type('Lusana@12345{enter}');

        cy.wait('@loginRequest');

        cy.url().should('not.include', '/login');
        cy.contains('Welcome').should('exist');
  });
});
