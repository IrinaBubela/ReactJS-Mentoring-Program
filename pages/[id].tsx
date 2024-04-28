import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Movie } from '../components/MovieListPage';

interface MoviePageProps {
  movie: Movie;
}

const MoviePage: React.FC<MoviePageProps> = ({ movie }) => {
  const router = useRouter();


  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {movie ? (
        <div className="row movie-details">
          <div className="col-md-4">
            <div className="poster">
              <img src={movie.poster_path} alt={movie.title} />
            </div>
          </div>
          <div className="col-md-8">
            <div className="details">
              <h2>{movie.title}</h2>
              <p><strong>Release Year:</strong> {movie.release_date}</p>
              <p><strong>Rating:</strong> {movie.vote_average}</p>
              <p><strong>Duration:</strong> {movie.runtime} min</p>
              <p><strong>Description:</strong> {movie.overview}</p>
            </div>
          </div>
        </div>
      ) : (<div>Error</div>)
      };
    </div >
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as ParsedUrlQuery;;
  try {
    const res = await fetch(`http://localhost:4000/movies/${id}`);
    const movie = await res.json();

    return {
      props: {
        movie,
      },
    };
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return {
      notFound: true,
    };
  }
};

export default MoviePage;
