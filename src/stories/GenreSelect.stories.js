import React from 'react';
import { action } from '@storybook/addon-actions';
import GenreSelect from '../components/GenreSelect'; 

export default {
  title: 'GenreSelect',
  component: GenreSelect,
};

export const Default = () => (
  <GenreSelect
    genres={['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy']}
    selectedGenre="Action"
    onSelect={action('genre selected')}
  />
);

export const Selected = () => (
  <GenreSelect
    genres={['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy']}
    selectedGenre="Drama"
    onSelect={action('genre selected')}
  />
);
