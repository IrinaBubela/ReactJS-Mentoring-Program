describe('should mount <MovieListPage />', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/movies*').as('fetchMovies');
    cy.visit('/');
    cy.wait('@fetchMovies');
  });

  it('should display movies', () => {
    cy.get('.movies-list').should('exist');
    cy.get('.edit-movie').should('have.length.greaterThan', 0);
  });

  it('should display movie list', () => {
    cy.get('input[type="text"]').type('{enter}');
  });

  it('should allow searching for movies', () => {
    const searchTerm = 'Inception'; 

    cy.get('input[type="text"]').type(searchTerm);

    cy.get('button[type="submit"]').click();

    cy.get('.edit-movie').should('have.length', 1);
    cy.contains('.edit-movie', 'Inception').should('exist');
  });

  it('should allow adding a movie', () => {
    cy.contains('Add Movie').click();

    cy.contains('Add movie').should('exist'); 
  });

  it('should fetch movies based on the search query', () => {
    const searchQuery = 'Inception';
    
    cy.visit('/');
    cy.get('input[type="text"]').type(searchQuery);
    cy.get('button[type="submit"]').click();

    cy.wait('@fetchMovies');

    cy.url().should('include', `query=${searchQuery}`);

    cy.get('.edit-movie').should('have.length.greaterThan', 0);
  });

});
