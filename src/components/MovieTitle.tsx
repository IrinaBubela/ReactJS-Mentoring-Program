import React from 'react';
import { Movie } from './MovieListPage';

interface Props {
    movie: Movie;
    onClick: (movie: Movie) => void;
}

const MovieTitle: React.FC<Props> = ({ movie, onClick }) => {
  return (
    <div className="container d-flex align-items-center justify-content-center mt-4" onClick={() => onClick(movie)}>
      <div className="movie-details-container col text-center">
        <div className="poster">
          <img src={movie.poster_path} alt={movie.title} />
        </div>
        <div className="details mt-4">
          <div className="name-and-genre">
            <h6>{movie.title}</h6>
            <p>{movie.genres.join(',')}</p>
          </div>
          <div className="year">
            <p className="border border-gray rounded p-1">{movie.release_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTitle;
