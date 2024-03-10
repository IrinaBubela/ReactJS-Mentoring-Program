import './App.css';
import {useState} from 'react';
import SearchForm from './components/SearchForm';
import GenreSelect from './components/GenreSelect';
import MovieTitle from './components/MovieTitle';
import MovieDetails from './components/MovieDetails';
import SortControl from './components/SortControl';
import Image1 from './img/image1.jpg';
import Image2 from './img/image2.jpg';
import Image3 from './img/image3.jpg';

const movies = [
  {
    imageUrl: Image1,
    name: 'Movie 1',
    releaseYear: 2021,
    genres: ['Action', 'Adventure'],
    rating: '7',
    duration: '2h',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    imageUrl: Image2,
    name: 'Movie 2',
    releaseYear: 2023,
    genres: ['Comedy', 'Romance'],
    rating: '4',
    duration: '2h 30min',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    imageUrl: Image3,
    name: 'Movie 3',
    releaseYear: 2022,
    genres: ['Drama'],
    rating: '10',
    duration: '1h 45min',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
];

const genres = ['Action', 'Drama',  'Adventure', 'Comedy', 'Horror'];

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

  const sortedMovies = movies.slice().sort((a, b) => {
    if (currentSort === 'releaseDate') {
      return a.releaseYear - b.releaseYear;
    } else if (currentSort === 'title') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="App container">
      <h2 className="h2 text-center">FIND YOUR MOVIE</h2>
      <div><SearchForm initialQuery="" onSearch={handleSearch} /></div>
      <div className="control-section container">
        <GenreSelect 
          genres={genres}
          selectedGenre={selectedGenre}
          onSelect={handleGenreSelect} // Change onSelect to handleGenreSelect
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
              <MovieTitle movie={movie} key={index} onClick={handleMovieClick}/>
          ))}
        </div>
      </div>
      {selectedMovie && <MovieDetails movie={selectedMovie} />}
    </div>
  );
}

export default App;
