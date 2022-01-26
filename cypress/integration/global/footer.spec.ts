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
  });

  describe('[SECTION]: Contact', () => {
    it('should contain a header saying "Contact Me"', () => {
      cy.get('[data-cy=footerGetInTouch]')
        .find('h3')
        .should('be.visible')
        .and('contain', 'Say Hello');
    });
    it('should have a button to send me an email', () => {
      cy.get('[data-cy=footerGetInTouch]')
        .find('a')
        .should('be.visible')
        .and('have.attr', 'href', 'mailto:rob.bailey3@gmail.com');
    });
  });
});
