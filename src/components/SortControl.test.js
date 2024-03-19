import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SortControl from './SortControl';

describe('SortControl', () => {
  it('renders correctly', () => {
    const currentSelection = 'releaseDate';
    const onSortChange = jest.fn();
    const { getByLabelText } = render(
      <SortControl currentSelection={currentSelection} onSortChange={onSortChange} />
    );
    expect(getByLabelText('Sort by:')).toBeInTheDocument();
    expect(getByLabelText('Sort by:')).toHaveValue('releaseDate');
  });

  it('calls onSortChange with correct value when selection changes', () => {
    const onSortChange = jest.fn();
    const { getByLabelText } = render(
      <SortControl currentSelection="releaseDate" onSortChange={onSortChange} />
    );

    const selectControl = getByLabelText('Sort by:');
    fireEvent.change(selectControl, { target: { value: 'title' } });

    // check if onSortChange is called with the correct value
    expect(onSortChange).toHaveBeenCalledWith('title');
  });
});
