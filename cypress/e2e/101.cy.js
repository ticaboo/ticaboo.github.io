/*
todo switch the host: dev 3000 3001, 'https://ticaboo.github.io/build'
*/

describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('[data-schedule').should('exist');
    cy.get('button').click();
  });
});
