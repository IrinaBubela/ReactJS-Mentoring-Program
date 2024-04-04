import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm.tsx';
import GenreSelect from './GenreSelect.tsx';
import MovieTitle from './MovieTitle.tsx';
import MovieDetails from './MovieDetails.tsx';
import SortControl from './SortControl.tsx';
import genres from '../genres.json';
import Dialog from './Dialog.tsx';
import MovieForm from './MovieForm.tsx';

export interface Movie {
    title: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    poster_path: string;
    overview: string;
    budget: number;
    revenue: number;
    runtime: number;
    genres: string[];
    id: number;
}

export const initialMovieInfoObject: Movie = {
    title: '',
    tagline: '',
    vote_average: 0,
    vote_count: 0,
    release_date: '',
    poster_path: '',
    overview: '',
    budget: 0,
    revenue: 0,
    runtime: 0,
    genres: [''],
    id: 0,
};


const MovieListPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchBy, setSearchBy] = useState<string>('title');
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [currentSort, setCurrentSort] = useState<string>('releaseDate');
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
    const [editDialogData, setEditDialogData] = useState<Movie | null>(null);

    useEffect(() => {
        let isFetching = false;

        const fetchMovies = async () => {
            if (isFetching) {
                return;
            }

            isFetching = true;

            try {
                const response = await fetch(`http://localhost:4000/movies?query&sortBy=${currentSort}&sortOrder=asc&filter=${selectedGenre}&search=${searchQuery}&searchBy=${searchBy}`);
                const data = await response.json();
                setMovieList(data.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                isFetching = false;
            }
        };

        fetchMovies();

    }, [searchQuery, currentSort, selectedGenre, searchBy]);

    const addMovie = () => {
        setShowAddDialog(true);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleSortChange = (selectedOption: string) => {
        setCurrentSort(selectedOption);
        setSelectedMovie(null);
    };

    const handleGenreSelect = (genre: string) => {
        setSelectedGenre(genre);
        setSelectedMovie(null);
    };

    const handleMovieSelect = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleSearchBy = (criteria: string) => {
        setSearchBy(criteria);
    }

    const onSubmitMovieForm = (form: Movie) => {
        console.log(form, 'form');
    };

    const onCloseMovieEditForm = () => {
        setShowEditDialog(false);
    };

    const onCloseMovieAddForm = () => {
        setShowAddDialog(false);
    };

    const editMovie = (movie: Movie) => {
        setEditDialogData(movie);
        setShowEditDialog(true);
    };

    const deleteMovie = (movie: Movie) => {
        setMovieList(movieList.filter(movieObject => movieObject.title !== movie.title));
    };

    return (
        <div className="App container">
            {!selectedMovie ?
                <div>
                    <h2 className="h2 text-center">FIND YOUR MOVIE</h2>
                    <div className="mb-4">
                        {['genres', 'title']
                            .map(criteria => (
                                <button
                                    key={criteria}
                                    onClick={() => handleSearchBy(criteria)}
                                    className={`btn btn-sm ${criteria === searchBy ? 'btn-danger' : 'btn-light'}`}>
                                    Search for {criteria}
                                </button>
                            ))}
                    </div>
                    <div>
                        <button className="btn btn-danger btn-outline mb-2" onClick={addMovie}>+ Add Movie</button>
                    </div>
                    <div><SearchForm initialQuery={''} onSearch={handleSearch} /></div>
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
                            {movieList
                                .filter(movie => !selectedGenre || movie.genres.includes(selectedGenre))
                                .map((movie, index) => (
                                    <div className="col edit-movie" key={index}>
                                        <div className="btns">
                                            <button className="btn btn-secondary" type="button" onClick={() => editMovie(movie)}>Edit movie</button>
                                            <button className="btn btn-secondary" type="button" onClick={() => deleteMovie(movie)}>Delete movie</button>
                                        </div>
                                        <MovieTitle movie={movie} key={index} onClick={handleMovieSelect} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                : <MovieDetails movie={selectedMovie} />
            }
            {showAddDialog &&
                <Dialog
                    title="Add movie"
                    onCloseDialog={onCloseMovieAddForm}
                >
                    <MovieForm
                        onSubmit={onSubmitMovieForm}
                        initialMovieInfo={initialMovieInfoObject}
                    />
                </Dialog>
            }
            {showEditDialog &&
                <Dialog
                    title="Edit movie"
                    onCloseDialog={onCloseMovieEditForm}
                >
                    <MovieForm
                        onSubmit={onSubmitMovieForm}
                        initialMovieInfo={editDialogData || initialMovieInfoObject}
                    />
                </Dialog>
            }
        </div>
    )
}

export default MovieListPage;
