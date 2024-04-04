import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MovieForm from './MovieForm';

describe('MovieForm Component', () => {
  const initialMovieInfo = {
    title: 'Test Movie',
    releaseYear: '2022',
    imageUrl: 'https://example.com/movie.jpg',
    rating: 'PG-13',
    genres: 'Action, Adventure',
    duration: '120',
    overview: 'This is a test movie.',
  };

  it('renders movie form with initial values', () => {
    const onSubmit = jest.fn();
    const { asFragment, getByLabelText, getByText } = render(
      <MovieForm initialMovieInfo={initialMovieInfo} onSubmit={onSubmit} />
    );

    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledWith(initialMovieInfo);
  });
});
