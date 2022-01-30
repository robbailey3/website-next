describe('[Page]: Homepage', () => {
  before(() => {
    cy.visit('/');
  });

  it('should load', () => {
    cy.get('[data-cy="header"]').should('exist');
  });
});
