describe('Products', () => {
  beforeEach(() => {
    cy.visit('/en/sign-in');
    cy.wait(1000);
    cy.get('input[name="email"]').type('test@gmail.com');
    cy.get('input[name="password"]').type('Testuser123');
    cy.get('[data-cy="submit-btn"]').click();
    cy.url().should('not.include', '/sign-in');
  });
  // without mocking so it actaully creates item
  //   it('adds product successfully', () => {
  //     cy.visit('/en/createProduct');
  //     cy.wait(1000);
  //     cy.get('input[name="name"]').type('testItem');
  //     cy.get('input[name="price"]').type('123');
  //     cy.get('input[name="brand"]').type('testBrand');
  //     cy.get('input[name="image"]').type(
  //       'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png'
  //     );
  //     cy.get('input[name="category"]').type('testCategory');
  //     cy.get('input[name="tags"]').type('testTags');
  //     cy.get('textarea[name="description"]').type('testDesc');
  //     cy.get('[data-cy="add-product-btn"]').click();
  //     cy.url().should('include', '/products/');
  //   });

  //   with mocking
  it('adds product successfully', () => {
    // Visit the page to create a product
    cy.visit('/en/createProduct');
    cy.wait(1000);

    cy.intercept('POST', 'https://servit.vercel.app/en/createProduct', {
      statusCode: 201,
      body: { success: true, productId: '12345' },
    }).as('addProduct');

    cy.get('input[name="name"]').type('testItem');
    cy.get('input[name="price"]').type('123');
    cy.get('input[name="brand"]').type('testBrand');
    cy.get('input[name="image"]').type(
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png'
    );
    cy.get('input[name="category"]').type('testCategory');
    cy.get('input[name="tags"]').type('testTags');
    cy.get('textarea[name="description"]').type('testDesc');

    cy.get('[data-cy="add-product-btn"]').click();

    cy.wait('@addProduct').then((interception) => {
      expect(interception.response?.statusCode).to.eq(201);
    });
  });

  it('adds product unsuccessfully', () => {
    cy.visit('/en/createProduct');
    cy.wait(1000);
    cy.get('input[name="name"]').type('testItem');
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

  it('should mock the deletion of the product', () => {
    cy.visit('/en/products/50');

    cy.intercept('POST', '/en/products/50', {
      statusCode: 200,
      body: { success: true },
    }).as('deleteProduct');

    cy.get('[data-cy="delete-product-btn"]').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Are you sure you want to delete this product?');
      return true;
    });
    cy.wait('@deleteProduct').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
    });
  });

  it('handles product deletion failure', () => {
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

  it('should mock purchasing of the product', () => {
    cy.visit('/en/products/50');

    cy.intercept('POST', '/api/create-product-checkout-session', {
      statusCode: 200,
      body: { sessionId: 'mockSessionId' },
    }).as('buyProduct');

    cy.get('[data-cy="buy-product-btn"]').click();

    cy.wait('@buyProduct').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body.sessionId).to.eq('mockSessionId');
    });
  });
  it('should handle failure when purchasing the product', () => {
    cy.visit('/en/products/50');

    cy.intercept('POST', '/api/create-product-checkout-session', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('buyProductFailure');

    cy.get('[data-cy="buy-product-btn"]').click();

    cy.wait('@buyProductFailure').then((interception) => {
      expect(interception.response?.statusCode).to.eq(500);
      expect(interception.response?.body.error).to.eq('Internal Server Error');
    });
  });
  it('added product to orders', () => {
    cy.visit(
      '/en/payment/success?session_id=cs_test_a1IAdiMJdZRuZnLfIeMdfe1y7cVYZ1SInWx0cDVGJNHk2P6AfrPk3EvYNX'
    );
    cy.get('h1').should('contain', 'Payment Success');
  });

  it('didnt add product to orders', () => {
    cy.visit('/en/payment/success?session_id=wrong');
    cy.get('p').should('contain', 'Failed to process payment');
  });
});
