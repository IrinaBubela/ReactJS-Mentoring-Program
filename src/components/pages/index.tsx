import React from 'react';
import SearchForm from './SearchForm.tsx';
import GenreSelect from './GenreSelect.tsx';
import MovieTitle from './MovieTitle.tsx';
import SortControl from './SortControl.tsx';
import genres from '../../genres.json';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types/index';

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

interface AppProps {
    movieList: Movie[]; 
  }

export const MovieListPage: React.FC<{movieList: Movie[]}> = ({ movieList }) => {
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [searchBy, setSearchBy] = React.useState<string>('title');
    const [selectedGenre, setSelectedGenre] = React.useState<string>('');
    const [currentSort, setCurrentSort] = React.useState<string>('releaseDate');
    const router = useRouter();
    console.log('searchQuery', searchQuery);
    

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleSortChange = (selectedOption: string) => {
        setCurrentSort(selectedOption);
    };

    const handleGenreSelect = (genre: string) => {
        setSelectedGenre(genre);
    };

    const redirectToAddMovie = () => {
        router.push('/new');
    };

    const editMovie = (movie: Movie) => {
        router.push(`/${movie.id}/edit`);
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
                    <button className="btn btn-danger btn-outline mb-2" onClick={redirectToAddMovie}>+ Add Movie</button>
                </div>
                <div>
                    <SearchForm initialQuery={''} onSearch={handleSearch} />
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
                        {movieList && movieList
                            .filter(movie => !selectedGenre || movie.genres.includes(selectedGenre))
                            .map((movie, index) => (
                                <div className="col edit-movie" key={index}>
                                    <div className="btns">
                                        <button className="btn btn-secondary edit-movie-btn" type="button" onClick={() => editMovie(movie)}>Edit movie</button>
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


export const getServerSideProps: GetServerSideProps = async () => {
    try {
      const API_URL = 'http://localhost:4000/movies';
      const response = await fetch(API_URL);
      const data = await response.json();
      const movieList = data.data;
      return {
        props: { movieList }
      };
    } catch (error) {
      console.error('Error fetching movies:', error);
      return {
        props: { movieList: [] }
      };
    }
  }