describe('Products', () => {
  beforeEach(() => {
    cy.visit('/en/sign-in');
    cy.wait(1000);
    cy.get('input[name="email"]').type('test@gmail.com');
    cy.get('input[name="password"]').type('Testuser123');
    cy.get('[data-cy="submit-btn"]').click();
    cy.url().should('not.include', '/sign-in');
  });
  it('adds product successfully', () => {
    cy.visit('/en/createProduct');
    cy.wait(1000);
    cy.get('input[name="name"]').type('testItemCY');
    cy.get('input[name="price"]').type('123');
    cy.get('input[name="brand"]').type('testBrand');
    cy.get('input[name="image"]').type(
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png'
    );
    cy.get('input[name="category"]').type('testCategory');
    cy.get('input[name="tags"]').type('testTags');
    cy.get('textarea[name="description"]').type('testDesc');
    cy.get('[data-cy="add-product-btn"]').click();
    cy.url().should('include', '/products/');
    cy.url().then((url) => {
      const productId = url.split('/').pop();
      Cypress.env('productId', productId);
    });
  });

  it('adds product unsuccessfully', () => {
    cy.visit('/en/createProduct');
    cy.wait(1000);
    cy.get('input[name="name"]').type('testItemCY');
    cy.get('input[name="price"]').type('-123');
    cy.get('input[name="brand"]').type('testBrand');
    cy.get('input[name="image"]').type(
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png'
    );
    cy.get('input[name="category"]').type('testCategory');
    cy.get('input[name="tags"]').type('testTags');
    cy.get('textarea[name="description"]').type('testDesc');
    cy.get('[data-cy="add-product-btn"]').click();
    cy.url().should('not.include', '/products/');
  });
  it('deletes product', () => {
    const productId = Cypress.env('productId');
    cy.visit(`/en/products/${productId}`);
    cy.get('[data-cy="delete-product-btn"]').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Are you sure you want to delete this product?');
      return true;
    });
    cy.url().should('not.include', '/products/');
  });

  it('deletion of the product fails', () => {
    cy.visit('/en/products/50');

    cy.intercept('POST', '/en/products/50', {
      statusCode: 500,
      body: { success: false, error: 'Something went wrong' },
    }).as('deleteProductFail');

    cy.get('[data-cy="delete-product-btn"]').click();

    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Are you sure you want to delete this product?');
      return true;
    });

    cy.wait('@deleteProductFail').then((interception) => {
      expect(interception.response?.statusCode).to.eq(500);
    });
  });

  it('purchasing of the product', () => {
    let sessionId;
    cy.visit('/en/products/1');

    cy.intercept('POST', '**/api/create-product-checkout-session', {
      statusCode: 200,
      body: {
        session_id:
          'cs_test_a12AgJz89SGLZbYHZoqMKpmqXKbMDmiJzd5xkCadE6YygJKvL0CvS9xXrR',
      },
    }).as('stripeCheckout');

    cy.get('[data-cy="buy-product-btn"]').click();

    cy.wait('@stripeCheckout').then((interception) => {
      sessionId = interception.response?.body.session_id;
      cy.wrap(sessionId).as('sessionId');
    });

    cy.url().should('include', '/en/products/1');
    cy.get('@sessionId').then((sessionId) => {
      cy.visit(`/en/payment/success?session_id=${sessionId}`);
      cy.contains('Payment Successful').should('be.visible');
    });
  });
  it('invalid purchasing of the product', () => {
    let sessionId;
    cy.visit('/en/products/1');

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

    cy.url().should('include', '/en/products/1');
    cy.get('@sessionId').then((sessionId) => {
      cy.visit(`/en/payment/success?session_id=${sessionId}`);
      cy.contains('Failed to process payment').should('be.visible');
    });
  });

  //after purchasing session id is validated and if its says payment successful it adds to orders so its same logic as purchising
  it('added product to orders', () => {
    let sessionId;
    cy.visit('/en/products/1');

    cy.intercept('POST', '**/api/create-product-checkout-session', {
      statusCode: 200,
      body: {
        session_id:
          'cs_test_a12AgJz89SGLZbYHZoqMKpmqXKbMDmiJzd5xkCadE6YygJKvL0CvS9xXrR',
      },
    }).as('stripeCheckout');

    cy.get('[data-cy="buy-product-btn"]').click();

    cy.wait('@stripeCheckout').then((interception) => {
      sessionId = interception.response?.body.session_id;
      cy.wrap(sessionId).as('sessionId');
    });

    cy.url().should('include', '/en/products/1');
    cy.get('@sessionId').then((sessionId) => {
      cy.visit(`/en/payment/success?session_id=${sessionId}`);
      cy.contains('Payment Successful').should('be.visible');
    });
  });

  it('didnt add product to orders', () => {
    let sessionId;
    cy.visit('/en/products/1');

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

    cy.url().should('include', '/en/products/1');
    cy.get('@sessionId').then((sessionId) => {
      cy.visit(`/en/payment/success?session_id=${sessionId}`);
      cy.contains('Failed to process payment').should('be.visible');
    });
  });
});
