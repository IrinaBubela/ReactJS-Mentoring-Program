import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MovieTitle from './MovieTitle';

// Mock movie data
const movie = {
  imageUrl: 'example.jpg',
  name: 'Example Movie',
  genres: ['Action', 'Adventure'],
  releaseYear: 2021
};

describe('MovieTitle', () => {
  it('renders correctly', () => {
    const onClickMock = jest.fn();
    const { getByText, getByAltText } = render(<MovieTitle movie={movie} onClick={onClickMock} />);

    expect(getByText('Example Movie')).toBeInTheDocument();
    expect(getByText('Action,Adventure')).toBeInTheDocument();
    expect(getByText('2021')).toBeInTheDocument();

    const moviePoster = getByAltText('Example Movie');
    expect(moviePoster).toBeInTheDocument();
    expect(moviePoster).toHaveAttribute('src', 'example.jpg');
  });

  it('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const { container } = render(<MovieTitle movie={movie} onClick={onClickMock} />);

    fireEvent.click(container.firstChild);

    expect(onClickMock).toHaveBeenCalledWith(movie);
  });
});
