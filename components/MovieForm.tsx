import React from 'react';
import { Form, Field, ErrorMessage, Formik, FormikHelpers, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { Movie, emptyMovieForPost } from './MovieListPage';
interface MovieFormProps {
  onSubmit: (formData: Movie) => void;
  initialInfo?: Movie;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  tagline: Yup.string(),
  vote_average: Yup.number().min(0, 'Vote average must be a positive number'),
  vote_count: Yup.number().min(0, 'Vote count must be a positive number'),
  release_date: Yup.string().required('Release Date is required'),
  poster_path: Yup.string().url().required('Invalid URL format'),
  overview: Yup.string().required('Overview is required'),
  budget: Yup.number().min(0, 'Budget must be a positive number'),
  revenue: Yup.number().min(0, 'Revenue must be a positive number'),
  runtime: Yup.number().required('Runtime is required').positive('Runtime must be a positive number'),
  genres: Yup.array().of(Yup.string()).min(1, 'At least one genre is required'),
});

const MovieForm: React.FC<MovieFormProps> = ({ onSubmit, initialInfo }) => {
  const handleGenresChange =
    (event: Event,
      setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<Movie>>
    ) => {
      const inputValue = event.target as HTMLInputElement;
      const genresArray = inputValue.value.split(',').map(genre => genre.trim());
      setFieldValue('genres', genresArray);
    }

  const handleSubmit = (values: Movie, { setSubmitting }: FormikHelpers<any>) => {
    setTimeout(() => {
      alert(`New Film ${values.title} was added`);
      setSubmitting(false);
    }, 400);
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialInfo || emptyMovieForPost}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
        <div className="row">
          <div className="col-8">
            <label htmlFor="title" className="form-label">Title</label>
            <Field type="text" className="form-control" id="title" name="title" />
            <ErrorMessage name="title" component="div" className="text-danger" />
          </div>
          <div className="col-4">
            <label htmlFor="release_date" className="form-label">Release Year</label>
            <Field type="text" className="form-control" id="release_date" name="release_date" />
            <ErrorMessage name="release_date" component="div" className="text-danger" />
          </div>
      
          <div className="col-8">
            <label htmlFor="poster_path" className="form-label">Movie URL</label>
            <Field type="text" className="form-control" id="poster_path" name="poster_path" />
            <ErrorMessage name="poster_path" component="div" className="text-danger" />
          </div>
      
          <div className="col-8">
            <label htmlFor="genres">Genres (comma-separated)</label>
            <Field type="text" className="form-control" id="genres" name="genres" onChange={(event: Event) => handleGenresChange(event, setFieldValue)} />
            <ErrorMessage name="genres" component="div" className="text-danger" />
          </div>
          <div className="col-4">
            <label htmlFor="runtime" className="form-label">Runtime</label>
            <Field type="text" className="form-control" id="runtime" name="runtime" />
            <ErrorMessage name="runtime" component="div" className="text-danger" />
          </div>
      
          <div className="col-12">
            <label htmlFor="overview" className="form-label">Overview</label>
            <Field as="textarea" className="form-control" id="overview" name="overview" />
            <ErrorMessage name="overview" component="div" className="text-danger" />
          </div>
      
          {/* New Fields */}
          <div className="col-8">
            <label htmlFor="tagline" className="form-label">Tagline</label>
            <Field type="text" className="form-control" id="tagline" name="tagline" />
            <ErrorMessage name="tagline" component="div" className="text-danger" />
          </div>
          <div className="col-4">
            <label htmlFor="vote_average" className="form-label">Vote Average</label>
            <Field type="text" className="form-control" id="vote_average" name="vote_average" />
            <ErrorMessage name="vote_average" component="div" className="text-danger" />
          </div>
      
          <div className="col-8">
            <label htmlFor="budget" className="form-label">Budget</label>
            <Field type="text" className="form-control" id="budget" name="budget" />
            <ErrorMessage name="budget" component="div" className="text-danger" />
          </div>
          <div className="col-4">
            <label htmlFor="revenue" className="form-label">Revenue</label>
            <Field type="text" className="form-control" id="revenue" name="revenue" />
            <ErrorMessage name="revenue" component="div" className="text-danger" />
          </div>
      
          <div className="col-12">
            <label htmlFor="vote_count" className="form-label">Vote Count</label>
            <Field type="text" className="form-control" id="vote_count" name="vote_count" />
            <ErrorMessage name="vote_count" component="div" className="text-danger" />
          </div>
        </div>
        <div className="form-actions">
          <div className="form-actions-btns">
            <div className="text-end mt-3">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
            </div>
          </div>
        </div>
      </Form>
      
      )}
    </Formik >
  );
};

export default MovieForm;
