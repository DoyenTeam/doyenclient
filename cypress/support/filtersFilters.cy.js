import React from 'react';
import Filters, { filters } from '../../app/filters';

describe('<Filters />', () => {
  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.mount(<Filters />);
  });

  it('should render filter sections and toggle them', () => {
    filters.forEach((filter) => {
      cy.get(`[data-testid="${filter.id}-section"]`).within(() => {
        cy.get('.font-medium.text-gray-900').contains(filter.name);
        cy.get('button').click();
        if (filter.id !== 'mesh') {
          filter.options.forEach((option) => {
            cy.get(`input[value="${option.value}"]`).should('be.visible');
            cy.get(`label`).contains(option.label);
          });
        } 
      });
    });
  });

  it('should toggle sections on click', () => {
    filters.forEach((filter) => {
      cy.get(`[data-testid="${filter.id}-section"]`).within(() => {
        cy.get('button').click();
        cy.get('.pt-6').should('be.visible');
        cy.get('button').click();
        cy.wait(500);
        cy.get('.pt-6').should('not.exist');
      });
    });
  });
});
