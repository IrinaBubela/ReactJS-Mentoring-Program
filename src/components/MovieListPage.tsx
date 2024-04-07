import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm.tsx';
import GenreSelect from './GenreSelect.tsx';
import MovieTitle from './MovieTitle.tsx';
import SortControl from './SortControl.tsx';
import genres from '../genres.json';
import Dialog from './Dialog.tsx';
import MovieForm from './MovieForm.tsx';
import { Link, useSearchParams } from 'react-router-dom';

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
    const [currentSort, setCurrentSort] = useState<string>('releaseDate');

    const [movieList, setMovieList] = useState<Movie[]>([]);

    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
    const [editDialogData, setEditDialogData] = useState<Movie | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const fetchMovies = async () => {
        let isFetching = false;
        if (isFetching) {
            return;
        }

        isFetching = true;

        try {
            const queryParams = new URLSearchParams();
            if (searchQuery) queryParams.set('search', searchQuery);
            if (currentSort) queryParams.set('sortBy', currentSort);
            if (selectedGenre) queryParams.set('filter', selectedGenre);
            if (searchBy) queryParams.set('searchBy', searchBy);
            queryParams.set('sortOrder', 'asc');

            const response = await fetch(`http://localhost:4000/movies?${queryParams.toString()}`);
            const data = await response.json();
            setMovieList(data.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            isFetching = false;
        }
    };

    useEffect(() => {
        setSearchQuery(searchParams.get('query') || '');
        setCurrentSort(searchParams.get('sortBy') || 'releaseDate');
        setSelectedGenre(searchParams.get('filter') || '');
        setSearchBy(searchParams.get('searchBy') || 'title');
        fetchMovies();
    }, [searchParams]);

    useEffect(() => {
        setSearchParams({ query: searchQuery, sortBy: currentSort, filter: selectedGenre, searchBy: searchBy });
    }, [searchQuery, currentSort, selectedGenre, searchBy]);

    const addMovie = () => {
        setShowAddDialog(true);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleSortChange = (selectedOption: string) => {
        setCurrentSort(selectedOption);
    };

    const handleGenreSelect = (genre: string) => {
        setSelectedGenre(genre);
    };

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
            <div>
                <h2 className="h2 text-center">FIND YOUR MOVIE</h2>
                <div className="mb-4">
                    {['genres', 'title']
                        .map(criteria => (
                            <button
                                key={criteria}
                                onClick={() => setSearchBy(criteria)}
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
                                        <button className="btn btn-secondary edit-movie-btn" type="button" onClick={() => editMovie(movie)}>Edit movie</button>
                                        <button className="btn btn-secondary delete-movie-btn" type="button" onClick={() => deleteMovie(movie)}>Delete movie</button>
                                    </div>
                                    <Link className="link-card" to={`/${movie.id}`}>
                                        <MovieTitle movie={movie} key={index} />
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {
                showAddDialog &&
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
            {
                showEditDialog &&
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
        </div >
    )
}

export default MovieListPage;
