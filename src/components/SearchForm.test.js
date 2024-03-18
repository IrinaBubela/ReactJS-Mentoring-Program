import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  test('Test that component renders an input with the value equal to initial value passed in props', () => {
    const initialQuery = 'Test value';
    const { getByDisplayValue } = render(<SearchForm initialQuery={initialQuery} />);
    const inputElement = getByDisplayValue(initialQuery);
    
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(initialQuery);
  });

  test('Test that after typing to the input and a "click" event on the Submit button, the "onChange" prop is called with proper value', () => {
    const onSearchMock = jest.fn();
    const { getByRole, getByDisplayValue } = render(<SearchForm onSearch={onSearchMock} />);
    const inputValue = 'thriller';
    const inputElement = getByDisplayValue('');
    
    fireEvent.change(inputElement, { target: { value: inputValue } });
    fireEvent.click(getByRole('button', { name: /search/i }));
    expect(onSearchMock).toHaveBeenCalledWith(inputValue);
  });

  test('Test that after typing to the input and pressing Enter key, the "onChange" prop is called with proper value', () => {
    const onSearchMock = jest.fn();
    const { getByDisplayValue } = render(<SearchForm onSearch={onSearchMock} />);
    const inputValue = 'comedy';
    const inputElement = getByDisplayValue('');

    fireEvent.change(inputElement, { target: { value: inputValue } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(onSearchMock).toHaveBeenCalledWith(inputValue);
  });
});
