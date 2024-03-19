import './App.css';
import { useState, useMemo } from 'react';
import SearchForm from './components/SearchForm';
import GenreSelect from './components/GenreSelect';
import MovieTitle from './components/MovieTitle';
import MovieDetails from './components/MovieDetails';
import SortControl from './components/SortControl';
import movies from './movies.json';
import genres from './genres.json';

function App() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentSort, setCurrentSort] = useState('releaseDate');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = (query) => {
    console.log('Looking for', query);
  };

  const handleSortChange = (selectedOption) => {
    setCurrentSort(selectedOption);
    setSelectedMovie(null);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSelectedMovie(null);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const sortedMovies = useMemo(() => {
    return movies.slice().sort((a, b) => {
      if (currentSort === 'releaseDate') {
        return a.releaseYear - b.releaseYear;
      } else if (currentSort === 'title') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  });

  return (
    <div className="App container">
      <h2 className="h2 text-center">FIND YOUR MOVIE</h2>
      <div><SearchForm initialQuery="" onSearch={handleSearch} /></div>
      <div className="control-section container">
        <GenreSelect
          genres={genres}
          selectedGenre={selectedGenre}
          onSelect={handleGenreSelect} 
        />
        <SortControl
          currentSelection={currentSort}
          onSortChange={handleSortChange}
        />
      </div>
      <div className="movies-list container">
        <div className="row row-cols-auto">
          {sortedMovies
            .filter(movie => !selectedGenre || movie.genres.includes(selectedGenre))
            .map((movie, index) => (
              <MovieTitle movie={movie} key={index} onClick={handleMovieClick} />
            ))}
        </div>
      </div>
      {selectedMovie && <MovieDetails movie={selectedMovie} />}
    </div>
  );
}

export default App;
