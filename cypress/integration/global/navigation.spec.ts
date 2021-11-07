describe('[GLOBAL COMPONENT]: Navigation', () => {
  before(() => {
    cy.visit('/');
  });

  const mobileViewports = [
    'iphone-x',
    'samsung-s10',
    'iphone-8',
  ] as Cypress.ViewportPreset[];
  mobileViewports.forEach((viewport) => {
    describe(`[${viewport}]`, () => {
      before(() => {
        cy.visit('/');
      });
      beforeEach(() => {
        cy.viewport(viewport);
      });
      it(`should render the navbar`, () => {
        cy.get('[data-cy=navigation]').should('be.visible');
      });

      it('should display the navbar toggle button', () => {
        cy.get('[data-cy=navigationToggle]').should('be.visible');
      });

      it('should not have the class "navigation__open"', () => {
        cy.get('[data-cy=navigation]').should(
          'not.have.class',
          'navigation__open'
        );
      });

      it('should apply the class "navigation__open" when the toggle button is clicked', () => {
        cy.get('[data-cy=navigationToggle]').click();
      });
    });
  });
});
