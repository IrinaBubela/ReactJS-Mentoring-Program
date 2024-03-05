import React from 'react';

const GenreSelect = ({ genres, selectedGenre, onSelect }) => {
  return (
    <div>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelect(genre)}
          style={{ backgroundColor: genre === selectedGenre ? 'lightgreen' : 'white' }}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreSelect;