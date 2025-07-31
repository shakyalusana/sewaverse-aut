describe('Signup Negative Tests', () => {
    beforeEach(() => {
        cy.visit('https://qc.sewaverse.com/account-type?role=user');
        cy.get('div[role="radiogroup"]').contains('Individual').click();
        cy.get('button[type="submit"]').contains('Next').click();
        cy.url().should('include','/register');
    })

    it('should show error when all fields are empty', () => {
        cy.get('button[type="submit"]').click();
        cy.contains('Invalid email address').should('be.visible');
        cy.contains('Password must be at least 6 characters').should('be.visible');
    })


    it('should show error when less than three characters are entered in full name', () => {
        cy.get('input[placeholder="Full Name"]').type('12');
        cy.get('button[type="submit"]').click();

        cy.contains('Name must be at least 3 characters').should('be.visible');
    })

    it('should show error when only full name is provided', () => {
        cy.get('input[placeholder="Full Name"]').type('Lusana Shakya');
        
        cy.get('button:visible').contains('Sign up').click();


        cy.contains('Please enter a valid phone number.').should('be.visible');
        cy.contains('Invalid email address').should('be.visible');
        cy.contains('Password must be at least 6 characters').should('be.visible');

    })

    it('should show error when only mobile number is provided', () => {
        cy.get('input[placeholder="Mobile Number"]').type('9845526324');
        cy.get('button[type="submit"]').click();

        cy.contains('Name must be at least 3 characters').should('be.visible');
        cy.contains('Invalid email address').should('be.visible');
        cy.contains('Password must be at least 6 characters').should('be.visible');

    })

    it('should show error when only email is provided', () => {
        cy.get('input[placeholder="Email Address"]').type('aykahsp2022@gmail.com');
        cy.get('button[type="submit"]').click();

        cy.contains('Name must be at least 3 characters').should('be.visible');
        cy.contains('Please enter a valid phone number').should('be.visible');
        cy.contains('Password must be at least 6 characters').should('be.visible');

    })

    it('should show error when only new password is provided', () => {
        cy.get('input[placeholder="New Password"]').type('Aykahs@12345');
        cy.get('button[type="submit"]').click();

        cy.contains('Name must be at least 3 characters').should('be.visible');
        cy.contains('Please enter a valid phone number').should('be.visible');
        cy.contains('Invalid email address').should('be.visible');

    })




})

    

