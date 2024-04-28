import { Movie, MovieListPage } from '../components/MovieListPage';
import { GetServerSideProps } from 'next';
interface AppProps {
  movieList: Movie[];
}

export const API_URL = 'http://localhost:4000';

export const App: React.FC<AppProps> = ({ movieList }) => {
  return (
    <>
      <MovieListPage movieList={movieList} />
    </>
  );
}

export default App;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const API_URL = 'http://localhost:4000/movies';
    const response = await fetch(API_URL);
    const data = await response.json();
    let movieList = data.data;

    if (query.query) {
      const searchQuery = query.query as string;
      movieList = movieList.filter((movie: Movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return {
      props: { movieList }
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      props: { movieList: [] }
    };
  }
}