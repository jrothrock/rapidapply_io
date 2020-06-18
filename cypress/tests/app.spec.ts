describe('Basic Routing Tests', function () {
  beforeEach(() => {
    // Will open the baseUrl found inside cypress.json
    cy.visit('');
  });

  it('Should navigate to Sign In page', function () {
    cy.findAllByText('Sign In').click()
    cy.findByRole('heading', { name: 'Sign in' }).should('exist');
  });

  it('Should navigate to the Sign Up page', function () {
    cy.findAllByText('Sign Up').click();
    cy.findByRole('heading', { name: 'Create Your Account' }).should('exist');
  });
});
