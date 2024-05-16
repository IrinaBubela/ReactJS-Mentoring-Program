import React, { useEffect, useState } from 'react';
import { Movie } from './MovieListPage';
import { API_URL } from '../pages';
import MovieForm from './MovieForm';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import Dialog from './Dialog';

const EditMovieForm: React.FC = () => {
    const [film, setFilm] = useState<Movie>();
    const [isClient, setIsClient] = useState(false);
    const params = useParams<{ movieId: string }>();
    const router = useRouter();

    useEffect(() => {
        setIsClient(true); // Set isClient to true when component mounts on the client side
        if (params && params.movieId) {
            getFilmDetails(params.movieId);
        }
    }, [params]);

    const getFilmDetails = async (id: string) => {
        await fetch(`${API_URL}/${id}`,)
            .then(res => res.json())
            .then(res => setFilm(res));
    };

    const handleSubmit = (form: Movie) => {
        editMovieApi(form);
        redirectToMainPage();
    };

    const redirectToMainPage = () => {
        router.push('/');
    };

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
            .then(res => console.log(res));
    };

    const dialogWasClosed = () => {
        redirectToMainPage();
    };

    return (
        <div>
            {isClient && film && (
                <Dialog
                    title="Edit Movie"
                    onCloseDialog={dialogWasClosed}
                >
                    <MovieForm
                        initialInfo={film}
                        onSubmit={handleSubmit}
                    />
                </Dialog>
            )}
        </div>
    );
};

export default EditMovieForm;