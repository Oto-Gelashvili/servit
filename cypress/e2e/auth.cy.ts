describe('Auth', () => {
  it('Logs in successfully', () => {
    cy.visit('/en/sign-in');

    cy.wait(1000);

    cy.get('input[name="email"]').type('test@gmail.com');

    cy.get('input[name="password"]').type('Testuser123');

    cy.get('[data-cy="submit-btn"]').click();

    cy.url().should('not.include', '/sign-in');
  });

  it('Fails to log in', () => {
    cy.visit('/en/sign-in');

    cy.wait(1000);

    cy.get('input[name="email"]').type('wrong@gmail.com');

    cy.get('input[name="password"]').type('Wrong123!');

    cy.get('[data-cy="submit-btn"]').click();

    cy.url().should('include', '/sign-in');
  });

  it('Signs up successfully without OTP', () => {
    const uniqueEmail = `test${Date.now()}@example.com`;

    cy.visit('en/sign-up');
    cy.wait(1000);
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type('Testuser123');
    cy.get('[data-cy="submit-btn"]').click();
    cy.url().should('not.include', '/sign-up');
  });
  it('Signs up unsuccessfully without OTP', () => {
    cy.visit('en/sign-up');
    cy.wait(1000);
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Testuser123');
    cy.get('[data-cy="submit-btn"]').click();
    cy.url().should('include', '/sign-up');
  });
  it('successfull log out', () => {
    cy.visit('/en/sign-in');

    cy.wait(1000);

    cy.get('input[name="email"]').type('test@gmail.com');

    cy.get('input[name="password"]').type('Testuser123');

    cy.get('[data-cy="submit-btn"]').click();

    cy.url().should('not.include', '/sign-in');

    cy.get('[data-cy="logout-btn"]').click();
    cy.url().should('include', '/sign-in');
  });
});
