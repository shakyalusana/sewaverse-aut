class SignupPage {
    elements = {
        fullname: () => cy.get('input[placeholder="Full Name"]'),
        mobilenumber: () => cy.get('input[placeholder="Mobile Number"]'),
        emailaddress: () => cy.get('input[placeholder="Email Address"]'),
        newpassword: () => cy.get('input[placeholder="New Password"]'),
        submit: () => cy.get('button[type="submit"]'),

    }

}
export const signupPage = new SignupPage();