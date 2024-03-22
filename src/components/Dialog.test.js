import { render, fireEvent } from '@testing-library/react';
import Dialog from './Dialog';

describe('Dialog Component', () => {
  const initialMovieInfo = {
    title: '',
    releaseYear: '',
    imageUrl: '',
    rating: '',
    genres: [],
    duration: '',
    overview: ''
  };

  it('renders dialog with title and close button', () => {
    const title = 'Test Dialog Title';
    const onCloseDialog = jest.fn();

    const { getByText } = render(
      <Dialog
        title={title}
        initialMovieInfo={initialMovieInfo}
        onSubmitDialog={() => {}}
        onCloseDialog={onCloseDialog}
      />
    );

    expect(getByText(title)).toBeInTheDocument();
    fireEvent.click(getByText('X')); // Close the dialog
    expect(onCloseDialog).toHaveBeenCalled();
  });
});
