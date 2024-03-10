import React from 'react';
import { action } from '@storybook/addon-actions';
import MovieDetails from '../components/MovieDetails';

export default {
  title: 'MovieDetails',
  component: MovieDetails,
};

const Template = (args) => <MovieDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  movies: [
    {
      imageUrl: 'https://example.com/movie1.jpg',
      name: 'Movie 1',
      releaseYear: 2021,
      rating: 'PG',
      duration: '2h',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum metus a nulla hendrerit, vitae feugiat nisi congue.'
    },
    {
      imageUrl: 'https://example.com/movie2.jpg',
      name: 'Movie 2',
      releaseYear: 2022,
      rating: 'PG-13',
      duration: '2h 30min',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum metus a nulla hendrerit, vitae feugiat nisi congue.'
    },
    {
      imageUrl: 'https://example.com/movie3.jpg',
      name: 'Movie 3',
      releaseYear: 2023,
      rating: 'R',
      duration: '1h 45min',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum metus a nulla hendrerit, vitae feugiat nisi congue.'
    }
  ],
  onMovieClick: action('Movie clicked'),
};
