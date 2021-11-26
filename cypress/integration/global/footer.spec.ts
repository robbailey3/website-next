describe('[GLOBAL COMPONENT]: Footer', () => {
  before(() => {
    cy.visit('/');
  });
  it('should render on the page', () => {
    cy.get('[data-cy=footer]').should('be.visible');
  });

  describe('[SECTION]: Social media menu', () => {
    it('should contain four social media links', () => {
      cy.get('[data-cy=footerSocialMenu]').find('a').should('have.length', 4);
    });

    it('should contain a Font Awesome Icon within each link', () => {
      cy.get('[data-cy=footerSocialMenu]')
        .find('a')
        .each(($el) => {
          cy.wrap($el).find('svg').should('be.visible');
        });
    });

    it('should contain a span for screen-readers in each link', () => {
      cy.get('[data-cy=footerSocialMenu]')
        .find('a')
        .each(($el) => {
          cy.wrap($el).find('span.sr-only').should('be.visible');
        });
    });
  });

  describe('[SECTION]: Contact', () => {
    it('should contain a header saying "Contact Me"', () => {
      cy.get('[data-cy=footerGetInTouch]')
        .find('h4')
        .should('be.visible')
        .and('contain', 'Contact Me');
    });
    it('should have a button to send me an email', () => {
      cy.get('[data-cy=footerGetInTouch]')
        .find('a')
        .should('be.visible')
        .and('have.attr', 'href', 'mailto: rob.bailey3@gmail.com');
    });
  });

  describe('[SECTION]: Attribution', () => {
    it('should contain an span to say this is built by me', () => {
      cy.get('[data-cy=footerAttribution]')
        .find('p')
        .should('be.visible')
        .and('contain', 'Created by Rob Bailey');
    });
  });
});
