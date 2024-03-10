import React from 'react';
import MovieDetails from '../components/MovieDetails';

export default {
  title: 'MovieDetails',
  component: MovieDetails,
};

const Template = (args) => <MovieDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  movie: {
    imageUrl: 'https://example.com/movie.jpg',
    name: 'Example Movie',
    releaseYear: 2023,
    rating: 'PG-13',
    duration: '2h 30min',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum metus a nulla hendrerit, vitae feugiat nisi congue.'
  },
};
