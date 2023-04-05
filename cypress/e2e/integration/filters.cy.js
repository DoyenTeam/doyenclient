describe('Filters component', () => {
    beforeEach(() => {
        cy.visit('https://doyenapp.org/');
        cy.viewport('macbook-16');
    });
  
    it('should display the Filters component', () => {
      cy.get('div').within(() => {
        cy.get('h3').should('be.visible');
      });
    });
  
    it('should display the correct number of filter sections', () => {
      cy.get('div').within(() => {
        cy.get('h3').should('have.length', filters.length);
      });
    });
  
    it('should display the correct icons when a filter section is opened/closed', () => {
      cy.get('div').within(() => {
        cy.get('h3').each(($h3, index) => {
          cy.wrap($h3).find('button').click();
          cy.wrap($h3).find('svg').should('have.attr', 'aria-hidden', 'true');
          cy.wrap($h3).find('button').click();
          cy.wrap($h3).find('svg').should('have.attr', 'aria-hidden', 'true');
        });
      });
    });
  
    it('should toggle the visibility of filter sections when a filter section is clicked', () => {
      cy.get('div').within(() => {
        cy.get('h3').each(($h3, index) => {
          cy.wrap($h3).find('button').click();
          cy.get('.space-y-4').eq(index).should('be.visible');
          cy.wrap($h3).find('button').click();
          cy.get('.space-y-4').eq(index).should('not.be.visible');
        });
      });
    });
  
    it('should have the correct initial state for checkboxes in all filter sections', () => {
      cy.get('div').within(() => {
        cy.get('.space-y-4').each(($section, index) => {
          filters[index].options.forEach((option, optionIdx) => {
            if (filters[index].id !== 'mesh') {
              cy.wrap($section).find(`input[id="filter-${filters[index].id}-${optionIdx}"]`).should('not.be.checked');
            }
          });
        });
      });
    });
  });
  

// describe('Filters component', () => {
//     beforeEach(() => {
//         cy.visit('https://doyenapp.org/');
//         cy.viewport('macbook-16');
//     });
  
//     const filterIds = ['publications', 'expertise', 'institution', 'mesh'];
  
//     filterIds.forEach((filterId, index) => {
//       it(`should display ${filterId} filter section`, () => {
//         cy.get(`[id="${filterId}"]`).should('be.visible');
//       });
  
//       it(`should toggle ${filterId} filter options when clicked`, () => {
//         cy.get(`[id="${filterId}"]`).click();
//         cy.get(`.disclosure-panel-${index}`).should('be.visible');
//         cy.get(`[id="${filterId}"]`).click();
//         cy.get(`.disclosure-panel-${index}`).should('not.be.visible');
//       });
  
//       it(`should display all options in ${filterId} filter`, () => {
//         const options = filters[index].options;
//         cy.get(`[id="${filterId}"]`).click();
//         options.forEach((option, optionIdx) => {
//           if (filterId !== 'mesh') {
//             cy.get(`[id="filter-${filterId}-${optionIdx}"]`).should('be.visible');
//             cy.get(`[for="filter-${filterId}-${optionIdx}"]`).contains(option.label);
//           } else {
//             cy.get('.mesh-tree').should('be.visible');
//           }
//         });
//       });
  
//       it(`should toggle the checkbox when clicked in ${filterId} filter`, () => {
//         if (filterId !== 'mesh') {
//           const options = filters[index].options;
//           cy.get(`[id="${filterId}"]`).click();
//           options.forEach((option, optionIdx) => {
//             cy.get(`[id="filter-${filterId}-${optionIdx}"]`).click().should('be.checked');
//             cy.get(`[id="filter-${filterId}-${optionIdx}"]`).click().should('not.be.checked');
//           });
//         }
//       });
//     });

//     it('should display the Filters component', () => {
//         cy.get('.filters-container').should('be.visible');
//       });
    
//       it('should display the correct number of filter sections', () => {
//         cy.get('.filters-container').children().should('have.length', filters.length);
//       });
    
//       it('should display the correct icons when a filter section is opened/closed', () => {
//         filters.forEach((filter, index) => {
//           cy.get(`[id="${filter.id}"]`).click();
//           cy.get(`.icon-${index}`).should('have.attr', 'aria-hidden', 'true');
//           cy.get(`[id="${filter.id}"]`).click();
//           cy.get(`.icon-${index}`).should('have.attr', 'aria-hidden', 'true');
//         });
//       });
    
//       it('should close the other filter sections when a new filter section is opened', () => {
//         filters.forEach((filter, index) => {
//           cy.get(`[id="${filter.id}"]`).click();
//           cy.get(`.disclosure-panel-${index}`).should('be.visible');
//           filters.forEach((otherFilter, otherIndex) => {
//             if (index !== otherIndex) {
//               cy.get(`.disclosure-panel-${otherIndex}`).should('not.be.visible');
//             }
//           });
//         });
//       });
    
//       it('should have the correct initial state for checkboxes in all filter sections', () => {
//         filters.forEach((filter, index) => {
//           cy.get(`[id="${filter.id}"]`).click();
//           filter.options.forEach((option, optionIdx) => {
//             if (filter.id !== 'mesh') {
//               cy.get(`[id="filter-${filter.id}-${optionIdx}"]`).should('not.be.checked');
//             }
//           });
//         });
//       });
//   });
  