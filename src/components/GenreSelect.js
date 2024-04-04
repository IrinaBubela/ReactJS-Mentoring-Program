import React from 'react';

const GenreSelect = ({ genres, selectedGenre, onSelect }) => {
  return (
    <div className="btn-group">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelect(genre)}
          className={`btn ${genre === selectedGenre ? 'btn-danger' : 'btn-light'}`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreSelect;
