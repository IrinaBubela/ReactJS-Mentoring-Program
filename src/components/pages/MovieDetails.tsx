import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '.';

const MovieDetails: React.FC = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState<Movie>();
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/movies/${movieId}`)
      .then((response) => response.json())
      .then((data: Movie) => setMovieDetails(data))
      .catch((err) => setError(err));
  }, []);

  return (
    <div className="container">
      {movieDetails ? (
        <div className="row movie-details">
          <div className="col-md-4">
            <div className="poster">
              <img src={movieDetails.poster_path} alt={movieDetails.title} />
            </div>
          </div>
          <div className="col-md-8">
            <div className="details">
              <h2>{movieDetails.title}</h2>
              <p><strong>Release Year:</strong> {movieDetails.release_date}</p>
              <p><strong>Rating:</strong> {movieDetails.vote_average}</p>
              <p><strong>Duration:</strong> {movieDetails.runtime} min</p>
              <p><strong>Description:</strong> {movieDetails.overview}</p>
            </div>
          </div>
        </div>
      ) : (<div>{error}</div>)
      };
    </div >
  );
};

export default MovieDetails;
