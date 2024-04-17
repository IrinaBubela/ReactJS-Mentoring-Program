import './App.css';
import AddMovieForm from './components/AddMovieForm.tsx';
import EditMovieForm from './components/EditMovieForm.tsx';
import MovieDetails from './components/MovieDetails.tsx';
import MovieListPage from './components/MovieListPage.tsx';
import { Routes, Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MovieListPage />}>
          <Route path="new" element={<AddMovieForm/>} />
          <Route path=":movieId/edit" element={<EditMovieForm/>} />
        </Route>
        <Route path="/:movieId" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
