import React from 'react';
import { render } from '@testing-library/react';
import MovieDetails from './MovieDetails';

// Mock movie data
const movie = {
  imageUrl: 'example.jpg',
  name: 'Example Movie',
  releaseYear: 2021,
  rating: 'PG-13',
  duration: '2h',
  description: 'This is an example movie description.'
};

describe('MovieDetails', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText } = render(<MovieDetails movie={movie} />);

    // Check if movie details are rendered correctly
    expect(getByText('Example Movie')).toBeInTheDocument();
    expect(getByText('Release Year:')).toBeInTheDocument();
    expect(getByText('2021')).toBeInTheDocument();
    expect(getByText('Rating:')).toBeInTheDocument();
    expect(getByText('PG-13')).toBeInTheDocument();
    expect(getByText('Duration:')).toBeInTheDocument();
    expect(getByText('2h')).toBeInTheDocument();
    expect(getByText('Description:')).toBeInTheDocument();
    expect(getByText('This is an example movie description.')).toBeInTheDocument();

    // Check if movie poster is rendered correctly
    const moviePoster = getByAltText('Example Movie');
    expect(moviePoster).toBeInTheDocument();
    expect(moviePoster).toHaveAttribute('src', 'example.jpg');
  });
});
