Cypress.Commands.add('selectRandomItem', { prevSubject: true }, (item) => {
  const randomIndex = Math.floor(Math.random() * item.length);
  const randomItem = item[randomIndex];
  return cy.wrap(randomItem);
});

Cypress.Commands.add('trimSpaces', { prevSubject: true }, (text) => {
  return text.replace(/\s+/g, '');
});

Cypress.Commands.add('checkCartState', ({ value }) => {
  cy.log(`Cart is visible and has ${value} items`);
  cy.get("[class*='CartQuantity']").should('have.text', value);
});
