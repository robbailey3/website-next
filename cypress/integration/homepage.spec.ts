describe('[PAGE]: Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the homepage', () => {
    cy.get('[data-cy=homepage-banner-title]').should('contain', 'Rob Bailey');
  });
});
