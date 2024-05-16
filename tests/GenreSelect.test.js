import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import GenreSelect from '../components/GenreSelect';
import { act } from 'react-dom/test-utils';

describe('GenreSelect Integration Test', () => {
  const genres = ['Western', 'Comedy', 'Drama', 'Horror'];
  const selectedGenre = 'Comedy';

  test('Renders GenreSelect component with correct genres and selection', async () => {
    const onSelectMock = jest.fn();

    const { getByText } = render(
      <GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={onSelectMock} />
    );

    // Check if all genres are rendered
    genres.forEach(genre => {
      expect(getByText(genre)).toBeInTheDocument();
    });

    // Click on a different genre and check if the onSelect callback is called
    const genreToSelect = 'Western';
    const genreButton = getByText(genreToSelect);
    
    await act(async () => {
      fireEvent.click(genreButton);
      await waitFor(() => {
        expect(onSelectMock).toHaveBeenCalledWith(genreToSelect);
      });
    });
  });
});