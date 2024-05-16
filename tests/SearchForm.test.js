import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchForm from '../components/SearchForm';

describe('SearchForm', () => {
  test('renders the search form correctly', () => {
    const onSearch = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <SearchForm initialQuery="" onSearch={onSearch} />
    );

    // Check if the input field and search button are rendered
    const inputElement = getByPlaceholderText('Search...');
    const searchButton = getByText('Search');

    expect(inputElement).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('calls onSearch when search button is clicked', () => {
    const onSearch = jest.fn();
    const { getByText } = render(<SearchForm initialQuery="" onSearch={onSearch} />);

    const searchButton = getByText('Search');
    fireEvent.click(searchButton);

    // Ensure onSearch is called with the correct query
    expect(onSearch).toHaveBeenCalledWith('');
  });

  test('calls onSearch when Enter key is pressed in the input field', () => {
    const onSearch = jest.fn();
    const { getByPlaceholderText } = render(<SearchForm initialQuery="" onSearch={onSearch} />);

    const inputElement = getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'Test Query' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', keyCode: 13 });

    // Ensure onSearch is called with the correct query
    expect(onSearch).toHaveBeenCalledWith('Test Query');
  });
});
