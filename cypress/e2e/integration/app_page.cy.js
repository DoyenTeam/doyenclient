describe('App page.js', () => {
  beforeEach(() => {
    cy.visit('https://doyenapp.org/');
    cy.viewport('macbook-16');
  });

  it('loads the home page', () => {
    cy.get('img[alt="Your Company"]').should('be.visible');
  });

  it('tests navigation links', () => {
    cy.get('a[href="/"]').should('be.visible').contains('Home');
    cy.get('a[href="#"]').should('be.visible').contains('Previous Exports');
  });

  it('tests Filters component visibility', () => {
    cy.get('.text-xs.font-semibold.leading-6.text-gray-400').contains('Filters');
  });

  it('tests sidebar visibility on desktop', () => {
    cy.viewport(1280, 720);
    cy.get('.lg\\:fixed.lg\\:inset-y-0.lg\\:z-50.lg\\:flex.lg\\:w-72.lg\\:flex-col').should('be.visible');
  });

  it('tests user menu dropdown', () => {
    cy.get('.-m-1\\.5.flex.items-center.p-1\\.5').click();
    cy.get('.absolute.right-0.z-10.mt-2\\.5.w-32.origin-top-right.rounded-md.bg-white.py-2.shadow-lg').should('be.visible');
    cy.get('a[href="#"]').should('be.visible').contains('Your profile');
    cy.get('a[href="#"]').should('be.visible').contains('Sign out');
  });

  it('tests navigation link active state', () => {
    cy.get('a[href="/"]').should('have.class', 'bg-gray-50 text-indigo-600');
  });

  it('should display the company logo', () => {
    cy.get('img[src="/logo.png"]').should('be.visible');
  });

  it('should display the navigation menu items', () => {
    const menuItems = ['Home', 'Previous Exports'];
    menuItems.forEach((item) => {
      cy.contains(item).should('be.visible');
    });
  });

  it('should display user profile image and name', () => {
    cy.get('img.rounded-full').should('be.visible');
    cy.contains('Alan Pham').should('be.visible');
  });

  it('should display the Filters section', () => {
    cy.contains('Filters').should('be.visible');
  });

  it('should display the user menu when user avatar is clicked', () => {
    cy.get('.p-1\\.5 img').click();
    cy.get('.absolute.right-0.z-10').should('be.visible');
  });

  it('should display user navigation items in the user menu', () => {
    cy.get('.p-1\\.5 img').click();
    const userNavItems = ['Your profile', 'Sign out'];
    userNavItems.forEach((item) => {
      cy.contains(item).should('be.visible');
    });
  });

  it('should display Search component', () => {
    cy.get('form').should('be.visible');
  });

  it('should have the home navigation item as the current page', () => {
    cy.get('a.bg-gray-50.text-indigo-600').contains('Home');
  });
});
  