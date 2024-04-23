import React from 'react';
import { action } from '@storybook/addon-actions';
import GenreSelect from '../components/pages/GenreSelect';

export default {
  title: 'GenreSelect',
  component: GenreSelect,
};

const genres = ['Action', 'Adventure', 'Comedy', 'Drama'];

export const Default = () => (
  <GenreSelect
    genres={genres}
    selectedGenre={genres[0]}
    onSelect={action('genre-selected')}
  />
);

export const WithDifferentSelection = () => (
  <GenreSelect
    genres={genres}
    selectedGenre={genres[2]}
    onSelect={action('genre-selected')}
  />
);
