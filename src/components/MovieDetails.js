import React from 'react';

const MovieDetails = ({ movie }) => {
  return (
    <div className="container mt-4">
      <div className="row movie-details">
        <div className="col-md-4">
          <div className="poster">
            <img src={movie.imageUrl} alt={movie.name} />
          </div>
        </div>
        <div className="col-md-8">
          <div className="details">
            <h2>{movie.name}</h2>
            <p><strong>Release Year:</strong> {movie.releaseYear}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Duration:</strong> {movie.duration}</p>
            <p><strong>Description:</strong> {movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
