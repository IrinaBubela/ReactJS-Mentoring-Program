import React from 'react';
import { API_URL, Movie, emptyMovieForPost } from './MovieListPage';
import Dialog from './Dialog';
import MovieForm from './MovieForm';
import { useNavigate } from 'react-router-dom';

const AddMovieForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (form: Movie) => {
    addNewMovieToApi(form);
    redirectToMainPage();
  }
  const redirectToMainPage = () => {
    navigate({
      pathname: '/',
    });
  }

  const addNewMovieToApi = (form: Movie) => {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }

  const dialogWasClosed = () => {
    redirectToMainPage();
  }

  return (
    < Dialog
      title="Add movie"
      onCloseDialog={dialogWasClosed} >
      < MovieForm
        initialInfo={emptyMovieForPost}
        onSubmit={handleSubmit}
      ></MovieForm >
    </Dialog >
  );
};

export default AddMovieForm;
