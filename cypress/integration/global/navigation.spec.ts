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
    describe(`[VIEWPORT]: ${viewport}`, () => {
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
    });
  });

  describe(
    '[VIEWPORT]: desktop',
    {
      viewportWidth: Cypress.config('viewportWidth'),
      viewportHeight: Cypress.config('viewportHeight'),
    },
    () => {
      it('should not display the navbar toggle button', () => {
        cy.get('[data-cy=navigationToggle]').should('not.exist');
      });
    }
  );

  describe('[SECTION]: Navigation Links', () => {
    it('should contain links to the different pages', () => {
      cy.get('[data-cy=navigation]').within(() => {
        cy.get('a').should('have.length', 5);
        cy.get('a')
          .eq(0)
          .should('contain', 'Home')
          .and('have.attr', 'href', '/');

        cy.get('a')
          .eq(1)
          .should('contain', 'About')
          .and('have.attr', 'href', '/about');

        cy.get('a')
          .eq(2)
          .should('contain', 'GitHub')
          .and('have.attr', 'href', '/github');

        cy.get('a')
          .eq(3)
          .should('contain', 'Projects')
          .and('have.attr', 'href', '/projects');

        cy.get('a')
          .eq(4)
          .should('contain', 'CV')
          .and('have.attr', 'href', '/cv');
      });
    });
  });
});
