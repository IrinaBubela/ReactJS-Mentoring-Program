import './App.css';
import MovieDetails from './components/MovieDetails.tsx';
import MovieListPage from './components/MovieListPage.tsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path=":movieId" element={<MovieDetails />}/>
      </Routes>
    </>
  );
}

export default App;