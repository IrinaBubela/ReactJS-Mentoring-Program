import MovieTitle from '../components/pages/MovieTitle';

export default {
  title: 'Components/MovieTitle',
  component: MovieTitle,
  argTypes: {
    movie: {
      control: {
        type: 'object',
      },
    },
    onClick: {
      action: 'clicked',
    },
  },
};

// Define a template for the component story
const Template = (args) => <MovieTitle {...args} />;

// Define a default story
export const Default = Template.bind({});
Default.args = {
  movie: {
    name: 'Interstellar',
    imageUrl: 'https://example.com/interstellar-poster.jpg',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    releaseYear: '2014',
  },
  onClick: () => { console.log('Movie clicked'); },
};
