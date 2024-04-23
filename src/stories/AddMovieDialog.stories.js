import React from 'react';
import Dialog from '../components/pages/Dialog';

export default {
  title: 'Add Movie Dialog',
  component: Dialog,
};

const Template = (args) => <Dialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Add Movie',
  initialMovieInfo: {
    title: '',
    releaseDate: '',
    imageUrl: '',
    rating: '',
    genres: [],
    runtime: '',
    overview: ''
  },
  onSubmitDialog: (movieInfo) => console.log('Submitted movie info:', movieInfo),
  onCloseDialog: () => console.log('Dialog closed')
};

// Add some styles to the story
export const Styled = Template.bind({});
Styled.args = {
  ...Default.args,
  title: 'Add Movie (Styled)',
  style: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto'
  }
};
