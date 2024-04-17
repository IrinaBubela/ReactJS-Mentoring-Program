import React, { useEffect, useState } from 'react';
import { API_URL, Movie } from './MovieListPage';
import Dialog from './Dialog';
import MovieForm from './MovieForm';
import { useNavigate, useParams } from 'react-router-dom';

const EditMovieForm: React.FC = () => {
    const [film, setFilm] = useState<Movie>();
    const { movieId } = useParams<string>();
    const navigate = useNavigate();

    useEffect(() => {
        getFilmDetails(String(movieId));
    }, [])

    const getFilmDetails = async (id: string) => {
        await fetch(`${API_URL}/${id}`,)
            .then(res => res.json())
            .then(res => setFilm(res));
    }

    const handleSubmit = (form: Movie) => {
        editMovieApi(form);
        redirectToMainPage();
    }
    const redirectToMainPage = () => {
        navigate({
            pathname: '/',
        });
    }

    const editMovieApi = (form: Movie) => {
        fetch(API_URL, {
            method: 'PUT',
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
        <div>
            {film && < Dialog
                title="Add movie"
                onCloseDialog={dialogWasClosed} >
                < MovieForm
                    initialInfo={film}
                    onSubmit={handleSubmit}
                ></MovieForm >
            </Dialog >}
        </div>
    );
};

export default EditMovieForm;
