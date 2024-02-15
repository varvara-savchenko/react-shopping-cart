const viewports = ['macbook-15', 'iphone-x'];
const grayColor = 'rgb(236, 236, 236)';
const blackColor = 'rgb(27, 26, 32)';
const sizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

viewports.forEach((viewport) => {
  describe(`${viewport}: test for size sorting`, () => {
    it('should sort product items by size', () => {
      cy.viewport(viewport);
      cy.visit('/');

      cy.log('Sizes labels are visible');
      cy.get("[class*='Filter__Container']")
        .should('be.visible')
        .within(() => {
          cy.get("[class*='Filter__Title']")
            .should('be.visible')
            .and('have.text', 'Sizes:');
          sizes.forEach((size) => {
            cy.contains('span', size)
              .should('be.visible')
              .and('have.css', 'background-color', grayColor);
          });
        });

      cy.log('Num of product items is decreased after clicking on size button');
      cy.get("[class*='Product__Container']").then((productItems) => {
        const productCount = productItems.length;
        cy.contains('span', sizes[2]).click();
        cy.get("[class*='Product__Container']")
          .its('length')
          .should('be.lt', productCount);
      });

      cy.log('Active size button changed color');
      cy.contains('span', sizes[2]).should(
        'have.css',
        'background-color',
        blackColor
      );

      cy.log('Other sizes button remain unchanged');
      sizes.forEach((size, index) => {
        if (index !== 2) {
          cy.contains('span', size).should(
            'have.css',
            'background-color',
            grayColor
          );
        }
      });

      cy.log('Add product to cart and verify that size is correct');
      cy.contains('button', 'Add to cart')
        .selectRandomItem()
        .click({ force: true }); //to avoid flakiness on responsive viewport
      cy.get("[class*='CartProduct__Desc']").should('contain.text', sizes[2]);
    });
  });
});
