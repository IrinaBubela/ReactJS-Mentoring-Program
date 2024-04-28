import React from 'react';

interface Props {
    genres: string[];
    selectedGenre: string;
    onSelect: (genre: string) => void;
}

const GenreSelect: React.FC<Props> = ({ genres, selectedGenre, onSelect }) => {
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
