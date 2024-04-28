// MovieListPage.tsx

import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import GenreSelect from './GenreSelect';
import MovieTitle from './MovieTitle';
import SortControl from './SortControl';
import genres from '../genres.json';
import { useRouter } from 'next/router';

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
    id?: number;
}

export const emptyMovieForPost: Movie = {
    title: '',
    tagline: 'Here\'s to the fools who dream.',
    vote_average: 0,
    vote_count: 0,
    release_date: '2016-12-29',
    poster_path: '',
    overview: '',
    budget: 102,
    revenue: 102,
    runtime: 102,
    genres: [],
};

export const API_URL = 'http://localhost:4000/movies';

export const MovieListPage: React.FC<{ movieList: Movie[] }> = ({ movieList }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchBy, setSearchBy] = useState<string>('title');
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [currentSort, setCurrentSort] = useState<string>('releaseDate');

    useEffect(() => {
        setSearchQuery(router.query.query as string || '');
        setCurrentSort(router.query.sortBy as string || 'releaseDate');
        setSelectedGenre(router.query.filter as string || '');
        setSearchBy(router.query.searchBy as string || 'title');
    }, [router.query]);

    const handleSearch = (query: string) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, query }
        });
    };

    const handleSortChange = (selectedOption: string) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, sortBy: selectedOption }
        });
    };

    const handleGenreSelect = (genre: string) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, filter: genre }
        });
    };

    const editMovie = (id: number) => {
        router.push(`/${id}/edit`);
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
                <SearchForm onSearch={handleSearch} />
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
                        {movieList && movieList
                            .filter(movie => !selectedGenre || movie.genres.includes(selectedGenre))
                            .map((movie, index) => (
                                <div className="col edit-movie" key={index}>
                                    <div className="btns">
                                        <button className="btn btn-secondary edit-movie-btn" type="button" onClick={() => editMovie(Number(movie.id))}>Edit movie</button>
                                    </div>
                                    <a className="link-card" href={`/${movie.id}`}>
                                        <MovieTitle movie={movie} key={index} />
                                    </a>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MovieListPage;
