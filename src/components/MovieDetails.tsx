import React from 'react';
import { Movie } from './MovieListPage';

interface Props {
    movie: Movie;
}

const MovieDetails: React.FC<Props> = ({ movie }) => {
  return (
    <div className="container mt-4">
      <div className="row movie-details">
        <div className="col-md-4">
          <div className="poster">
            <img src={movie.poster_path} alt={movie.title} />
          </div>
        </div>
        <div className="col-md-8">
          <div className="details">
            <h2>{movie.title}</h2>
            <p><strong>Release Year:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average}</p>
            <p><strong>Duration:</strong> {movie.runtime} min</p>
            <p><strong>Description:</strong> {movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
