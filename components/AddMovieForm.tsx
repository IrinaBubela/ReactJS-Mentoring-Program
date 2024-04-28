import React from 'react';
import { Movie, emptyMovieForPost } from '../components/MovieListPage';
import Dialog from '../components/Dialog';
import MovieForm from '../components/MovieForm';
import { useRouter } from 'next/router';
import { API_URL } from '../pages';

const AddMovieForm: React.FC = () => {
    const router = useRouter();

    const handleSubmit = (form: Movie) => {
        addNewMovieToApi(form);
        redirectToMainPage();
    }
    
    const redirectToMainPage = () => {
        router.push('/');
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
