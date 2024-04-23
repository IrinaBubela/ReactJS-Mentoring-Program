import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieForm from '../pages/MovieForm';

describe('MovieForm', () => {
  test('submits form successfully', async () => {
    const mockOnSubmit = jest.fn();

    const { getByLabelText, getByText } = render(
      <MovieForm onSubmit={mockOnSubmit} />
    );

    fireEvent.change(getByLabelText('Title'), { target: { value: 'Test Movie' } });
    fireEvent.change(getByLabelText('Release Year'), { target: { value: '2022-01-01' } });
    fireEvent.change(getByLabelText('Vote Average'), { target: { value: '5' } });
    fireEvent.change(getByLabelText('Vote Count'), { target: { value: '6' } });
    fireEvent.change(getByLabelText('Movie URL'), { target: { value: 'https://example.com/poster.jpg' } });
    fireEvent.change(getByLabelText('Genres (comma-separated)'), { target: { value: 'Action, Drama' } });
    fireEvent.change(getByLabelText('Runtime'), { target: { value: 120 } });
    fireEvent.change(getByLabelText('Tagline'), { target: { value: "Here's to the fools who dream." } });
    fireEvent.change(getByLabelText('Budget'), { target: { value: 102 } });
    fireEvent.change(getByLabelText('Revenue'), { target: { value: 102 } });
    fireEvent.change(getByLabelText('Overview'), { target: { value: 'Test movie overview' } });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        budget: 102,
        genres: [
          "Action",
          "Drama",
        ],
        overview: "Test movie overview",
        poster_path: "https://example.com/poster.jpg",
        release_date: "2022-01-01",
        revenue: 102,
        runtime: "120",
        tagline: "Here's to the fools who dream.",
        title: "Test Movie",
        vote_average: "5",
        vote_count: "6",
      });

    });
  });
});
