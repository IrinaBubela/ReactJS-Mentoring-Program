import React from 'react';
import Dialog from '../components/pages/Dialog';
import './page.css'; 

export default {
  title: 'Delete Movie Dialog',
  component: Dialog,
};

const Template = (args) => <Dialog {...args} />;

// Define the story
export const Default = Template.bind({});
Default.args = {
  title: 'Delete Movie',
  initialMovieInfo: {
    title: 'Movie Title',
    releaseDate: '2022-01-01',
    imageUrl: 'https://example.com/movie.jpg',
    rating: '5',
    genres: ['Action', 'Adventure'],
    runtime: '120 min',
    overview: 'Movie overview'
  },
  onSubmitDialog: (movieInfo) => console.log('Submitted movie info:', movieInfo),
  onCloseDialog: () => console.log('Dialog closed'),
  showDeleteButton: true 
};

// Add some styles to the story
export const Styled = Template.bind({});
Styled.args = {
  ...Default.args,
  title: 'Delete Movie (Styled)',
  className: 'styled-dialog'
};
