describe('Products', () => {
  beforeEach(() => {
    cy.visit('/en/sign-in');
    cy.wait(1000);
    cy.get('input[name="email"]').type('test@gmail.com');
    cy.get('input[name="password"]').type('Testuser123');
    cy.get('[data-cy="submit-btn"]').click();
    cy.url().should('not.include', '/sign-in');
  });

  it('adds service successfully', () => {
    cy.visit('/en/createService');
    cy.wait(1000);
    cy.get('input[name="title"]').type('testItemCY');
    cy.get('[data-cy="category"]').click();
    cy.get('[data-cy="categoryLi"]').first().click();
    cy.get('input[name="price"]').type('123');
    cy.get('textarea[name="desc"]').type('testDesc');
    cy.get('[data-cy="submitBtn"]').click();
    cy.url().should('include', '/services/');
    cy.url().then((url) => {
      const serviceId = url.split('/').pop();
      Cypress.env('serviceId', serviceId);
    });
  });

  it('adds service unsuccessfully', () => {
    cy.visit('/en/createService');
    cy.wait(1000);
    cy.get('input[name="title"]').type('testItemCY');
    cy.get('[data-cy="submitBtn"]').click();
    cy.url().should('not.include', '/services/');
  });

  it('deletes service', () => {
    const serviceId = Cypress.env('serviceId');
    cy.visit(`/en/services/${serviceId}`);
    cy.get('[data-cy="delete-product-btn"]').click();
    cy.get('[data-cy="confirmBtn"]').click();
    cy.url().should('not.include', '/services/');
  });

  it('deletion of the service fails', () => {
    cy.visit('/en/services/22');

    cy.intercept('POST', '/en/services/22', {
      statusCode: 500,
      body: { success: false, error: 'Something went wrong' },
    }).as('deleteProductFail');

    cy.get('[data-cy="delBtn"]').click();
    cy.get('[data-cy="confirmBtn"]').click();

    cy.wait('@deleteProductFail').then((interception) => {
      expect(interception.response?.statusCode).to.eq(500);
    });
  });

  it('adds service to usedServices', () => {
    let sessionId;
    cy.visit('/en/services/13');

    cy.intercept('POST', '**/api/create-product-checkout-session', {
      statusCode: 200,
      body: {
        session_id:
          'cs_test_a1vRwIlxUDXJg2gRdxGPVwo9w8R0WuTMEmukAC4jslnohhqznv2LolwF3S',
      },
    }).as('stripeCheckout');

    cy.get('[data-cy="buy-product-btn"]').click();

    cy.wait('@stripeCheckout').then((interception) => {
      sessionId = interception.response?.body.session_id;
      cy.wrap(sessionId).as('sessionId');
    });

    cy.url().should('include', '/en/services/13');
    cy.get('@sessionId').then((sessionId) => {
      cy.visit(`/en/payment/success?session_id=${sessionId}`);
      cy.contains('Payment Successful').should('be.visible');
    });
  });

  it('did not add service to usedServices', () => {
    let sessionId;
    cy.visit('/en/services/13');

    cy.intercept('POST', '**/api/create-product-checkout-session', {
      statusCode: 400,
      body: {
        error: 'Payment failed',
      },
    }).as('stripeCheckoutFailure');

    cy.get('[data-cy="buy-product-btn"]').click();

    cy.wait('@stripeCheckoutFailure').then((interception) => {
      sessionId = interception.response?.body.session_id;
      cy.wrap(sessionId).as('sessionId');
    });

    cy.url().should('include', '/en/services/13');
    cy.get('@sessionId').then((sessionId) => {
      cy.visit(`/en/payment/success?session_id=${sessionId}`);
      cy.contains('Payment Unsuccessful!').should('be.visible');
    });
  });
});
