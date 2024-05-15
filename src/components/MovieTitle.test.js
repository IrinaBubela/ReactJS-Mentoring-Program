import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieTitle from './MovieTitle';

describe('MovieTitle', () => {
  test('renders movie title and details correctly', () => {
    const movie = {
      title: 'Test Movie',
      poster_path: 'https://example.com/poster.jpg',
      genres: ['Action', 'Drama'],
      release_date: '2022-01-01',
    };

    const { getByText, getByAltText } = render(<MovieTitle movie={movie} />);

    expect(getByAltText('Test Movie')).toBeInTheDocument();
    expect(getByText('Test Movie')).toBeInTheDocument();
    expect(getByText('2022-01-01')).toBeInTheDocument();
  });
});
