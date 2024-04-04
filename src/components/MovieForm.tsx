import React, { useState } from 'react';
import { Movie, initialMovieInfoObject } from './MovieListPage';

interface MovieFormProps {
  initialMovieInfo?: Movie;
  onSubmit: (formData: Movie) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ initialMovieInfo, onSubmit }) => {
  const [movieInfo, setMovieInfo] = useState<Movie>(initialMovieInfo || initialMovieInfoObject);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(movieInfo);
  };

  return (
    <form className='container' onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-8">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={movieInfo.title} onChange={handleChange} />
        </div>
        <div className="col-4">
          <label htmlFor="releaseYear" className="form-label">Release Year</label>
          <input type="text" className="form-control" id="releaseYear" name="releaseYear" value={movieInfo.release_date} onChange={handleChange} />
        </div>

        <div className="col-8">
          <label htmlFor="imageUrl" className="form-label">Movie URL</label>
          <input type="text" className="form-control" id="imageUrl" name="imageUrl" value={movieInfo.poster_path} onChange={handleChange} />
        </div>
        <div className="col-4">
          <label htmlFor="rating" className="form-label">Rating</label>
          <input type="text" className="form-control" id="rating" name="rating" value={movieInfo.overview} onChange={handleChange} />
        </div>

        <div className="col-8">
          <label htmlFor="genres" className="form-label">Genre</label>
          <input type="text" className="form-control" id="genres" name="genres" value={movieInfo.genres} onChange={handleChange} />
        </div>
        <div className="col-4">
          <label htmlFor="duration" className="form-label">Runtime</label>
          <input type="text" className="form-control" id="duration" name="duration" value={movieInfo.runtime} onChange={handleChange} />
        </div>

        <div className="col-12">
          <label htmlFor="overview" className="form-label">Overview</label>
          <textarea className="form-control" id="overview" name="overview" value={movieInfo.overview} onChange={handleChange}></textarea>
        </div>
      </div>
      <div className="form-actions">
        <div className="form-actions-btns">
          <div className="text-end mt-3">
            <button type="button" className="btn btn-gray btn-secondary btn-reset">Reset</button>
          </div>
          <div className="text-end mt-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MovieForm;
