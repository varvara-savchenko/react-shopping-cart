const viewports = ['macbook-15', 'iphone-x'];

viewports.forEach((viewport) => {
  describe(`${viewport}: test for a general purchase flow`, () => {
    it('should add item to the cart and proceed to checkout', () => {
      cy.viewport(viewport);
      cy.visit('/');

      cy.log('Elements for each product item are visible');
      cy.get("[class*='Product__Container']")
        .should('have.length.gte', 1) //assuming this value is dynamic
        .each((productItem) => {
          cy.wrap(productItem)
            .should('be.visible')
            .within(() => {
              const productItemElements = ['Title', 'Val', 'BuyButton'];
              productItemElements.forEach((element) => {
                cy.get(`[class*='Product__${element}']`)
                  .should('be.visible')
                  .invoke('text')
                  .should('not.be.empty');
              });
            });
        });

      cy.log('Get a random product item');
      cy.get("[class*='Product__Container']")
        .selectRandomItem()
        .within(() => {
          cy.log('Save product title');
          cy.get("[class*='Product__Title']").invoke('text').as('productTitle');

          cy.log('Save product price');
          cy.get("[class*='Product__Val']")
            .invoke('text')
            .trimSpaces()
            .as('productPrice');

          cy.log('Add item to cart');
          cy.contains('button', 'Add to cart').click({ force: true }); //to avoid flakiness on responsive viewport
        });

      cy.log('Product description inside cart tab is correct');
      cy.get('@productTitle').then((productTitle) => {
        cy.get("[class*='CartProduct__Title']").should(
          'have.text',
          productTitle
        );
      });

      cy.log('Product price inside cart tab is correct');
      cy.get("[class*='Cart__SubPriceValue']")
        .invoke('text')
        .trimSpaces()
        .as('cartPrice');
      cy.get('@productPrice').then((productPrice) => {
        cy.get('@cartPrice').then((cartPrice) => {
          expect(productPrice).to.deep.eq(cartPrice);
        });
      });

      cy.log(
        'Proceed to checkout and verify alert message has correct price and text'
      );
      cy.contains('button', 'Checkout').click();
      cy.on('window:alert', (message) => {
        const messagePrice = message.match(/:\s*(.*)/)[1];
        const trimmedMessagePrice = messagePrice.replace(/\s+/g, '');
        cy.get('@cartPrice').then((cartPrice) => {
          expect(cartPrice).to.deep.eq(trimmedMessagePrice);
          expect(message).to.deep.eq(`Checkout - Subtotal: ${messagePrice}`);
        });
      });
    });
  });
});
