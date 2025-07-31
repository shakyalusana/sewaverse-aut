describe('Login Positive Test', () => {
  beforeEach(() => {
    cy.visit('https://qc.sewaverse.com/login');
  });

  it('should login successfully with valid email and password', () => {

    cy.fixture('validFormat').as('validcredentials');

    cy.get('@validcredentials').then((validcredentials) => {
    validcredentials.forEach((validdata) => {
    cy.validcredentials(validdata.email, validdata.password);

    cy.get('button[type="submit"]').click();

    cy.logout();
    return;
      });
    });
  });
});
