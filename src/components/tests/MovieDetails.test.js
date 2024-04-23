import { render } from '@testing-library/react';
import MovieDetails from '../pages/MovieDetails';

// Mock movie data
const movie = {
  imageUrl: 'example.jpg',
  name: 'Example Movie',
  releaseYear: '2021',
  rating: '10',
  duration: '2h',
  description: 'This is an example movie description.'
};

describe('MovieDetails', () => {
  it('renders correctly', () => {
    const { container } = render(<MovieDetails movie={movie} />);

    expect(container).toMatchSnapshot();
  });
});
