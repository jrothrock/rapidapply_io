const randomEmail = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + "@rapidapply.io";
describe('SignIn Tests', function () {

  it('should navigate to sign up page', function () {
    cy.visit('/signup');
    cy.findByRole('heading', { name: 'Create Your Account' }).should('exist');
  })

  it('Fill Out Sign Up Form, and Check User Has Been Created', function () {
    cy.get('input[name="firstname"]')
    .type('first')

    cy.get('input[name="lastname"]')
    .type('last')
    
    cy.get('input[name="email"]')
    .type(randomEmail)

    cy.get('input[name="password"]')
    .type('password')

    cy.get('input[name="password_confirmation"]')
    .type('password')

    cy.get('form').contains('Sign Up').click()

    cy.location('pathname', {timeout: 10000})
    .should('eq', '/');
    cy.findAllByText('Sign Out', {timeout: 10000}).should('exist');
  });

  it('Check User Can Log Out', function () {
    cy.findAllByText('Sign Out').click();
    cy.findAllByText('Sign In').should('exist');
  });

  it('should navigate to sign in page', function () {
    cy.visit('/signin');
    cy.findByRole('heading', { name: 'Sign in' }).should('exist');
  })

  it('Fill Out Sign In Form, and Check User Is Logged In', function () {
    cy.get('input[name="email"]')
    .type(randomEmail)

    cy.get('input[name="password"]')
    .type('password')

    cy.get('form').contains('Sign In').click()

    cy.location('pathname', {timeout: 10000})
    .should('eq', '/');
    cy.findAllByText('Sign Out', {timeout: 10000}).should('exist');
  });
});
