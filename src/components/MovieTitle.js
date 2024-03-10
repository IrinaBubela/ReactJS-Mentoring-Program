import React from 'react';

const MovieTitle = ({ movie, onClick }) => {

  return (
    <div className="container d-flex align-items-center justify-content-center mt-4" onClick={() => onClick(movie)}>
      <div className="movie-details-container col text-center">
        <div className="poster">
          <img src={movie.imageUrl} alt={movie.name} />
        </div>
        <div className="details mt-4">
          <div className="name-and-genre">
            <h6>{movie.name}</h6>
            <p>{movie.genres.join(',')}</p>
          </div>
          <div className="year">
            <p className="border border-gray rounded p-1">{movie.releaseYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTitle;
