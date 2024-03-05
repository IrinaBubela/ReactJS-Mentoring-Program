import './App.css';
import {useState} from 'react';
import Counter from './components/Counter';
import SearchForm from './components/SearchForm';
import GenreSelect from './components/GenreSelect';

function App() {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleSearch = (query) => {
    console.log('Looking for', query);
  };

  const genres = ['Thriller', 'Drama',  'Art House', 'Comedy', 'Horror'];

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    console.log(genre, 'selectedGenre');
  };

  return (
    <div className="App">
    <div>
      <Counter initialValue={0}/></div>
      <hr></hr>
      <div><SearchForm initialQuery="" onSearch={handleSearch} /></div>
      <hr></hr>
      <div><GenreSelect 
        genres={genres}
        selectedGenre={selectedGenre}
        onSelect={handleGenreSelect}/>
      </div>
    </div>
  );
}

export default App;
