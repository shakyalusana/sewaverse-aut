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
          expect($form[0].checkValidity()).to.be.false; //output dincha check garera
        });

      });
    });
  });


  it('should show error when fields are empty', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid email address').should('be.visible');
    cy.contains('Password must be at least 6 characters').should('be.visible'); //contains ma chai website ma j error dekhaucha tei lekhne
  });

  it('should show error when only email is provided', () => {
    cy.get('input[placeholder="Email address"]').type('lusana2018.shakya@gmail.com');
    cy.get('button[type="submit"]').click();

    cy.contains('Password must be at least 6 characters').should('be.visible');
  });

  it('should show error when only password is provided', () => {
    cy.get('input[placeholder="Password"]').type('Lusana@12345');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid email address').should('be.visible');
  });

  it('should show error for email with spaces', () => {
    const emailWithSpaces = ' user@ example . com ';

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
    expect($form[0].checkValidity()).to.be.false;// form error bhayeko le false le nai error msg dekhaucha
    }); 
  });

  it('should show error for missing @ in email', () => {
    const emailWithoutAd = 'lusanagmail.com';

    cy.get('input[placeholder="Email address"]').type('emailWithoutAd');
    cy.get('input[placeholder="Password"]').type('randompassword123');

    cy.get('form').then(($form) => {
      expect($form[0].checkValidity()).to.be.false;
    });

  })

  it('should show error when password is less than 6 characters', () => {
    cy.get('input[placeholder="Email address"]').type('aykahsp2022@gmail.com');
    cy.get('input[placeholder="Password"]').type('ram');

    cy.get('form').then(($form) => {
      expect($form[0].checkValidity()).to.be.true;
    });

    cy.get('button[type="submit"]').click();

    cy.contains('Password must be at least 6 characters');
    
  })
});
  


