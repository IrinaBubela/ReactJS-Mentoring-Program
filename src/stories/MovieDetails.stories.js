import MovieDetails from '../components/MovieDetails';

export default {
  title: 'Components/MovieDetails',
  component: MovieDetails,
  argTypes: {
    movie: {
      control: {
        type: 'object',
      },
    },
  },
}; 

// Define a template for the component story
const Template = (args) => <MovieDetails {...args} />;

// Define a default story
export const Default = Template.bind({});
Default.args = {
  movie: {
    name: 'Interstellar',
    imageUrl: 'https://example.com/interstellar-poster.jpg',
    releaseYear: '2014',
    rating: 8.6,
    duration: '2h 49min',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
  },
};
