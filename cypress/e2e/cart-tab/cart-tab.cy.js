const viewports = ['macbook-15', 'iphone-x'];

viewports.forEach((viewport) => {
  describe(`${viewport}: test for cart tab component`, () => {
    beforeEach(() => {
      cy.viewport(viewport);
      cy.visit('/');
    });

    it('should check cart tab empty state', () => {
      cy.log("Open cart tab and verify it's empty");
      cy.get("[class*='CartIcon']").click();
      cy.checkCartState({ value: '0' });
      cy.get("[class*='CartProductsEmpty']")
        .should('be.visible')
        .and('have.text', 'Add some products in the cart :)');
      cy.get("[class*='SubPriceValue']")
        .should('be.visible')
        .and('have.text', '$ 0.00');

      cy.log('Proceed to checkout and verify alert message');
      cy.contains('button', 'Checkout').click();
      cy.on('window:alert', (message) => {
        expect(message).to.deep.eq('Add some product in the cart!');
      });
      cy.log('Close cart tab and verify changes');
      cy.get("[class*='CartButton']").click();
      cy.contains("[class*='Cart__Container']").should('not.exist');
    });

    it('should check interactions with items quantity inside cart tab', () => {
      cy.log('Add product to cart');
      cy.contains('button', 'Add to cart').first().click();

      cy.log('Items is presented inside cart tab');
      cy.get('[class*=CartProduct__Container]')
        .should('be.visible')
        .and('have.length', 1);
      cy.checkCartState({ value: '1' });

      cy.log('Verify decrement button is disabled');
      cy.get("[class*='CartProduct__ChangeQuantity']")
        .first()
        .should('be.disabled');

      cy.log('Increament number of products and verify changes');
      cy.get("[class*='CartProduct__ChangeQuantity']").last().click();
      cy.checkCartState({ value: '2' });

      cy.log('Decrement number of products and verify changes');
      cy.get("[class*='CartProduct__ChangeQuantity']").first().click();
      cy.checkCartState({ value: '1' });

      cy.log('Remove product item and verify changes');
      cy.get("[class*='CartProduct__DeleteButton']").click();
      cy.checkCartState({ value: '0' });
      cy.get("[class*='CartProductsEmpty']").should('be.visible');
    });
  });
});
