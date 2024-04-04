import React, { ChangeEvent } from 'react';

interface Props {
    currentSelection: string;
    onSortChange: (selectedOption: string) => void;
}

const SortControl: React.FC<Props> = ({ currentSelection, onSortChange }) => {
  
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onSortChange(selectedOption); 
  };

  return (
    <div className="sort-control form-group">
      <label htmlFor="sort-by">Sort by:</label>
      <select className="form-control" id="sort-by" value={currentSelection} onChange={handleSortChange}>
        <option value="releaseDate">Release Year</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortControl;