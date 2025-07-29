describe('Login Functionality Tests', () => {
  beforeEach(() => {
    cy.visit('https://qc.sewaverse.com/login');
  });

  it('should show error for invalid login format from fixture', () => {
    cy.fixture('invalidFormat.json').then((data) => {
      data.forEach(({ email, password }) => {
        
        cy.get('input[placeholder="Email address"]').clear().type(email);
        cy.get('input[placeholder="Password"]').clear().type(password);

        
        cy.get('form').then(($form) => {
          expect($form[0].checkValidity()).to.be.false;
        });

        cy.get('button[type="submit"]').click();

        cy.contains('Invalid email address').should('exist');
      });
    });
  });
return;
  it('should login successfully with valid credentials', () => {
    cy.intercept('POST', '/api/login').as('loginRequest');

    cy.get('input[placeholder="Email address"]').type('lusana2018.shakya@gmail.com');
    cy.get('input[placeholder="Password"]').type('Lusana@12345');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');

    cy.url().should('not.include', '/login');
    cy.contains('Welcome').should('exist'); 
  });

  it('should show error when fields are empty', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible'); 
  });

  it('should show error when only email is provided', () => {
    cy.get('input[placeholder="Email address"]').type('lusana2018.shakya@gmail.com');
    cy.get('button[type="submit"]').click();

    cy.contains('Password is required').should('be.visible');
  });

  it('should show error when only password is provided', () => {
    cy.get('input[placeholder="Password"]').type('Lusana@12345');
    cy.get('button[type="submit"]').click();

    cy.contains('Email is required').should('be.visible');
  });

  it('should show error for email with spaces', () => {
    const emailWithSpaces = ' user @ example . com ';

    cy.get('input[placeholder="Email address"]').type(emailWithSpaces);
    cy.get('input[placeholder="Password"]').type('somePassword123');

    cy.get('form').then(($form) => {
      expect($form[0].checkValidity()).to.be.false;
    });

    cy.get('button[type="submit"]').click();

    cy.contains('Invalid email address').should('exist'); 
  });

  it('should show validation error for email with special characters', () => {
    const invalidEmail = '!!!@@@###$$$.com';

    cy.get('input[placeholder="Email address"]').type(invalidEmail);
    cy.get('input[placeholder="Password"]').type('somePassword123');

    cy.get('form').then(($form) => {
    expect($form[0].checkValidity()).to.be.false;
    });

    cy.get('button[type="submit"]').click();

    cy.contains('Invalid email address').should('exist'); 
  });

  it('should show error for non-registered email', () => {
    cy.intercept('POST', '/api/login').as('loginRequest');

    cy.get('input[placeholder="Email address"]').type('notregistered@example.com');
    cy.get('input[placeholder="Password"]').type('somePassword123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');

    cy.contains('Invalid email or password').should('be.visible'); 
  });
  

});
