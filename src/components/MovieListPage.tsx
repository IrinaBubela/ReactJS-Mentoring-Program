import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm.tsx';
import GenreSelect from './GenreSelect.tsx';
import MovieTitle from './MovieTitle.tsx';
import MovieDetails from './MovieDetails.tsx';
import SortControl from './SortControl.tsx';
import genres from '../genres.json';

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

const MovieListPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchBy, setSearchBy] = useState<string>('title');
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [currentSort, setCurrentSort] = useState<string>('releaseDate');
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    useEffect(() => {
        let isFetching = false; // Flag to track if a request is in progress
    
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
                                    <MovieTitle movie={movie} key={index} onClick={handleMovieSelect} />
                                ))}
                        </div>
                    </div>
                </div>
                : <MovieDetails movie={selectedMovie} />
            }
        </div>
    )
}

export default MovieListPage;
