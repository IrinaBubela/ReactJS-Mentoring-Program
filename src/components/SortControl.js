import React from 'react';

const SortControl = ({ currentSelection, onSortChange }) => {
  
  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    onSortChange(selectedOption); 
  };

  return (
    <div className="sort-control form-group">
      <label htmlFor="sort-by">Sort by:</label>
      <select className="form-control" id="sort-by" value={currentSelection} onChange={handleSortChange}>
        <option value="releaseDate">Release Date</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortControl;
