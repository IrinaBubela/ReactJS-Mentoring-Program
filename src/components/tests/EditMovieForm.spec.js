import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditMovieForm from '../pages/[movieId]/edit';

// Mocking useParams and useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ movieId: '123' }),
  useNavigate: () => jest.fn(),
}));

describe('EditMovieForm', () => {
  test('renders EditMovieForm correctly', async () => {
    await act(async () => {
      render(<EditMovieForm />);
    });
  });
});
