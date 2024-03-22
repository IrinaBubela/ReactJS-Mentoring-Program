import { useState } from 'react';
import { initialMovieInfoObject } from '../App';

const MovieForm = ({ initialMovieInfo, onSubmit }) => {
  const [movieInfo, setMovieInfo] = useState(initialMovieInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    const formData = Object.fromEntries(new FormData(event.target));
    event.preventDefault();
    onSubmit(formData);
  };

  const resetDialog = () => {
    setMovieInfo(initialMovieInfoObject);
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
          <input type="text" className="form-control" id="releaseYear" name="releaseYear" value={movieInfo.releaseYear} onChange={handleChange} />
        </div>

        <div className="col-8">
          <label htmlFor="imageUrl" className="form-label">Movie URL</label>
          <input type="text" className="form-control" id="imageUrl" name="imageUrl" value={movieInfo.imageUrl} onChange={handleChange} />
        </div>
        <div className="col-4">
          <label htmlFor="rating" className="form-label">Rating</label>
          <input type="text" className="form-control" id="rating" name="rating" value={movieInfo.rating} onChange={handleChange} />
        </div>

        <div className="col-8">
          <label htmlFor="genres" className="form-label">Genre</label>
          <input type="text" className="form-control" id="genres" name="genres" value={movieInfo.genres} onChange={handleChange} />
        </div>
        <div className="col-4">
          <label htmlFor="duration" className="form-label">Runtime</label>
          <input type="text" className="form-control" id="duration" name="duration" value={movieInfo.duration} onChange={handleChange} />
        </div>

        <div className="col-12">
          <label htmlFor="overview" className="form-label">Overview</label>
          <textarea className="form-control" id="overview" name="overview" value={movieInfo.overview} onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="modal-footer">
        <div className="text-end mt-3">
          <button type="button" onClick={resetDialog} className="btn btn-primary">Reset</button>
        </div> 
        <div className="text-end mt-3">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div> 
      </div>
    </form>
  );
};

export default MovieForm;
