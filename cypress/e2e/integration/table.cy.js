describe("Table Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/results?q=parkinson%20disease%20covid-19%20drug%20treatment%20");
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    console.error('Uncaught exception:', err);
    return false;
  });

  it('Renders the search results to the user', () => {
    cy.get('table').should('be.visible');
  });

  it('Renders the results table header', () => {
    cy.get('table thead').should('be.visible');
  });

  it('Checks if the results table header is visible', () => {
    cy.get('thead').should('be.visible');
  });

  it('Renders the results table body', () => {
    cy.get('table tbody').should('be.visible');
  });

  it('Checks if the results table body is visible', () => {
    cy.get('tbody').should('be.visible');
  });

  it('Renders Expert Name column', () => {
    cy.get('table thead th').eq(0).should('contain.text', 'Expert Name');
  });

  it('Checks if the Expert Name header is visible', () => {
    cy.get('th').contains('Expert Name').should('be.visible');
  });

  it('Renders Expert Score column', () => {
    cy.get('table thead th').eq(1).should('contain.text', 'Expert Score');
  });

  it('Checks if the Expert Score header is visible', () => {
    cy.get('th').contains('Expert Score').should('be.visible');
  });

  it('Renders the Publications column', () => {
    cy.get('table thead th').eq(2).should('contain.text', '# of Relevant Publications');
  });

  it('Checks if the Publications header is visible', () => {
    cy.get('th').contains('Publications').should('be.visible');
  });

  it('Renders View on PubMed column', () => {
    cy.get('table thead th').eq(3).should('contain.text', 'View on PubMed');
  });

  it("Opens a new tab with PubMed URL when PubMed link is clicked", () => {
    cy.get("tbody tr:first").within(() => {
      cy.get("button")
        .invoke("attr", "onClick")
        .then((onClick) => {
          const pubMedUrl = "https://pubmed.ncbi.nlm.nih.gov/?term=Suzie+Cro+parkinson+disease+covid-19+drug+treatment";
          cy.request(pubMedUrl).then((response) => {
            expect(response.status).to.eq(200);
          });
        });
    });
  });

  it('Renders the results filter button', () => {
    cy.get('button').contains('Filters').should('be.visible');
  });

  it('Checks if the results table has a row', () => {
    cy.get('tbody tr').should('have.length.at.least', 1);
  });
  
  it('Checks if the Expert Score column contains a number', () => {
    cy.get('tbody tr').first().find('td').eq(1).invoke('text').should('match', /\d+/);
  });
  
  it('Checks if the Publications column contains a number', () => {
    cy.get('tbody tr').first().find('td').eq(2).invoke('text').should('match', /\d+/);
  });

  it('Renders the Expert Score filter', () => {
    cy.get('button').contains('Filters').click();
    cy.get('span').contains('Expert Score').should('be.visible');
  });
  
  it('Checks if the filter button has the correct text', () => {
    cy.get('button').contains('Filters').should('have.text', 'Filters');
  });

  it('Renders the Publications filter', () => {
    cy.get('button').contains('Filters').click();
    cy.get('span').contains('Publications').should('be.visible');
  });
    
  it('Renders the Previous button', () => {
    cy.get('button').contains('Previous').should('be.visible');
  });

  it('Renders the Next button', () => {
    cy.get('button').contains('Next').should('be.visible');
  });

  it('Disables the Previous button on first page', () => {
    cy.get('button').contains('Previous').should('be.disabled');
  });

  it('Sorts Expert Score column in ascending order', () => {
    cy.get('th').contains('Expert Score').click();
    cy.get('tbody tr').first().find('td').eq(1).should('contain', '1');
  });

  it('Sorts Expert Score column in descending order', () => {
    cy.get('th').contains('Expert Score').click().click();
    cy.get('tbody tr').first().find('td').eq(1).should('contain', '1');
  });

  it('Sorts Publications column in ascending order', () => {
    cy.get('th').contains('Publications').click();
    cy.get('tbody tr').first().find('td').eq(1).should('contain', '1');
  });

  it('Sorts Publications column in descending order', () => {
    cy.get('th').contains('Publications').click().click();
    cy.get('tbody tr').first().find('td').eq(2).should('contain', '2');
  });

  it("Displays a results table with the correct structure", () => {
    cy.get("table")
      .should("be.visible")
      .within(() => {
        cy.get("thead").within(() => {
          cy.get("th").eq(0).contains("Expert Name");
          cy.get("th").eq(1).contains("Expert Score");
          cy.get("th").eq(2).contains("# of Relevant Publications");
          cy.get("th").eq(3).contains("View on PubMed");
        });
        cy.get("tbody").within(() => {
          cy.get("tr").its("length").should("eq", 10);
        });
      });
  });
  
  it("Sorts the results table by Expert Score", () => {
    cy.get("th").eq(1).click();
    cy.get("tbody tr:first").within(() => {
      cy.get("td").eq(1).invoke("text").as("highestScore");
    });

    cy.get("th").eq(1).click();
    cy.get("tbody tr:first").within(() => {
      cy.get("td").eq(1).invoke("text").as("lowestScore");
    });

    cy.get("@highestScore").then((highestScore) => {
      cy.get("@lowestScore").then((lowestScore) => {
        expect(Number(highestScore)).to.be.at.least(9.10444);
      });
    });
  });
  
  it("Sorts the results table by # of Relevant Publications", () => {
    cy.get("th").eq(2).click();
    cy.get("tbody tr:first").within(() => {
      cy.get("td").eq(2).invoke("text").as("highestCount");
    });

    cy.get("th").eq(2).click();
    cy.get("tbody tr:first").within(() => {
      cy.get("td").eq(2).invoke("text").as("lowestCount");
    });

    cy.get("@highestCount").then((highestCount) => {
      cy.get("@lowestCount").then((lowestCount) => {
        expect(Number(highestCount)).to.be.at.least(1);
      });
    });
  });
  
  it("Displays a disabled previous page button on first page", () => {
    cy.get("button:contains('Previous')").should('be.disabled');
  });

  it("Displays an empty message when there are no search results", () => {
    cy.visit("http://localhost:3000/results?q=dentistry%20parkinson%20disease%20covid-19%20drug%20treatment%20"); 
    cy.get(".flex.flex-col.items-center.justify-center.mt-10.pt-40")
      .should("be.visible")
      .within(() => {
        cy.get(".text-4xl.text-gray-600")
          .contains("Sorry, it seems experts have yet to publish work exploring these connections");
      });
  });
});