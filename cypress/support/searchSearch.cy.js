import React from 'react';
import Search from '../../app/search';
import SearchBar from '../../app/SearchBar';

describe('<Search />', () => {
  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.mount(<Search />);
  });

  it('renders the logo', () => {
    cy.get('img').should('have.attr', 'src', './logo.png');
  });

  it('renders the search prompt', () => {
    cy.contains('Search for an Expert').should('be.visible');
  });

  it('renders the primary search terms label', () => {
    cy.contains('Primary Search Terms').should('be.visible');
  });

  it('renders the search bar', () => {
    cy.get('SearchBar').should('exist');
  });

  it('renders the sign-in divider', () => {
    cy.contains('Or Sign In with').should('be.visible');
  });

  it('renders the Google sign-in button', () => {
    cy.get('button')
      .contains('Sign in with Google')
      .should('be.visible');
  });

  it('renders the Github sign-in button', () => {
    cy.get('button')
      .contains('Sign in with Github')
      .should('be.visible');
  });

  it('renders the Twitter sign-in button', () => {
    cy.get('button')
      .contains('Sign in with Twitter')
      .should('be.visible');
  });

  it('checks Google button hover', () => {
    cy.get('button').contains('Sign in with Google').trigger('mouseover');
    cy.get('button').contains('Sign in with Google').should('have.css', 'background-color');
  });

  it('checks Github button hover', () => {
    cy.get('button').contains('Sign in with Github').trigger('mouseover');
    cy.get('button').contains('Sign in with Github').should('have.css', 'background-color');
  });

  it('checks Twitter button hover', () => {
    cy.get('button').contains('Sign in with Twitter').trigger('mouseover');
    cy.get('button').contains('Sign in with Twitter').should('have.css', 'background-color');
  });

  it('checks Google button focus', () => {
    cy.get('button').contains('Sign in with Google').focus();
    cy.get('button').contains('Sign in with Google').should('have.css', 'box-shadow');
  });

  it('checks Github button focus', () => {
    cy.get('button').contains('Sign in with Github').focus();
    cy.get('button').contains('Sign in with Github').should('have.css', 'box-shadow');
  });

  it('checks Twitter button focus', () => {
    cy.get('button').contains('Sign in with Twitter').focus();
    cy.get('button').contains('Sign in with Twitter').should('have.css', 'box-shadow');
  });
});
