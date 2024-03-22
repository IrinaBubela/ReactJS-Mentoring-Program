import './App.css';
import { useState, useMemo, useEffect, FC } from 'react';
import GenreSelect from './components/GenreSelect.js';
import MovieTitle from './components/MovieTitle.js';
import MovieDetails from './components/MovieDetails.js';
import SortControl from './components/SortControl.js';
import SearchForm from './components/SearchForm.js';
import Dialog from './components/Dialog.tsx';
import moviesList from './movies.json';
import genres from './genres.json';

export interface InitialMovieInfoInterface {
  title: string;
  releaseYear: string;
  imageUrl: string;
  rating: string;
  genres: string[];
  duration: string;
  overview: string;
}

export const initialMovieInfoObject: InitialMovieInfoInterface = {
  title: '',
  releaseYear: '',
  imageUrl: '',
  rating: '',
  genres: [],
  duration: '',
  overview: ''
};

const App: FC = () => {
  const [movies, setMovies] = useState<InitialMovieInfoInterface[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<string>('releaseDate');
  const [selectedMovie, setSelectedMovie] = useState<InitialMovieInfoInterface | null>(null);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [editDialogData, setEditDialogData] = useState<InitialMovieInfoInterface | null>(null);

  const handleSearch = (query: string) => {
    console.log('Looking for', query);
  };

  const handleSortChange = (selectedOption: string) => {
    setCurrentSort(selectedOption);
    setSelectedMovie(null);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setSelectedMovie(null);
  };

  const handleMovieClick = (movie: InitialMovieInfoInterface) => {
    setSelectedMovie(movie);
  };

  const sortedMovies = useMemo(() => {
    if (currentSort === 'releaseDate' || currentSort === 'title') {
      return [...movies].sort((a, b) => {
        if (currentSort === 'releaseDate') {
          return parseInt(a.releaseYear) - parseInt(b.releaseYear);
        } else if (currentSort === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    } else {
      return [...movies];
    }
  }, [currentSort, movies]);

  const addMovie = () => {
    setShowAddDialog(true);
  };

  const editMovie = (movie: InitialMovieInfoInterface) => {
    setEditDialogData(movie);
    setShowEditDialog(true);
  };

  const deleteMovie = (movie: InitialMovieInfoInterface) => {
    setMovies(movies.filter(movieObject => movieObject.title !== movie.title));
  };

  const onSubmitMovieForm = (form: InitialMovieInfoInterface) => {
    console.log(form, 'form');
  };

  const onCloseMovieEditForm = () => {
    setShowEditDialog(false);
  };

  const onCloseMovieAddForm = () => {
    setShowAddDialog(false);
  };

  useEffect(() => {
    setMovies(moviesList);
  }, []);


  return (
    <div className="App container">
      <h2 className="h2 text-center">FIND YOUR MOVIE</h2>
      <div>
        <button className="btn btn-danger btn-outline mb-2" onClick={addMovie}>+ Add Movie</button>
      </div>
      <div>
        <SearchForm initialQuery="" onSearch={handleSearch} />
      </div>
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
              <div className="col edit-movie" key={index}>
                <div className="btns">
                  <button className="btn btn-secondary" type="button" onClick={() => editMovie(movie)}>Edit movie</button>
                  <button className="btn btn-secondary" type="button" onClick={() => deleteMovie(movie)}>Delete movie</button>
                </div>
                <MovieTitle movie={movie} onClick={handleMovieClick} />
              </div>
            ))}
        </div>
      </div>
      {showAddDialog && <Dialog title="Add movie" initialMovieInfo={initialMovieInfoObject} onSubmitDialog={onSubmitMovieForm} onCloseDialog={onCloseMovieAddForm} />}
      {showEditDialog && <Dialog title="Edit movie" initialMovieInfo={editDialogData || initialMovieInfoObject} onSubmitDialog={onSubmitMovieForm} onCloseDialog={onCloseMovieEditForm} />}
      {selectedMovie && <MovieDetails movie={selectedMovie} />}
    </div>
  );
}

export default App;
