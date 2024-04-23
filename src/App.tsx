import './App.css';
import MovieListPage, { Movie } from './components/pages/index';
import { GetServerSideProps } from 'next';

interface AppProps {
  movieList: Movie[]; 
}

export const App: React.FC<AppProps> = ({ movieList }) => {
  return (
    <>
      <MovieListPage movieList={movieList} />
    </>
  );
}

export default App;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const API_URL = 'http://localhost:4000/movies';
    const response = await fetch(API_URL);
    const data = await response.json();
    const movieList = data.data;
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
