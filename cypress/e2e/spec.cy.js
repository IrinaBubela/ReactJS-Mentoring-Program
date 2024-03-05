describe('My React App', () => {
  it('successfully loads', () => {
    cy.visit('/'); 
    cy.contains('h1', 'Welcome to My React App');
  });

  it('interacting with SearchForm and GenreSelect components', () => {
    cy.get('input[type="text"]').type('New Query');
    cy.get('button').contains('Search').click();
    
    cy.contains('button', 'Adventure').click();
    cy.contains('p', 'Selected Genre: Adventure');
  });
});
