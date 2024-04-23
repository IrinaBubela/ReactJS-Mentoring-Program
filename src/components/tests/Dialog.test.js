import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dialog from '../pages/Dialog';

describe('Dialog', () => {
  test('renders dialog with title and close button', () => {
    const handleCloseDialog = jest.fn();

    const { getByText, queryByText } = render(
      <Dialog title="Test Dialog" onCloseDialog={handleCloseDialog}>
        <p>Dialog content</p>
      </Dialog>
    );

    expect(getByText('Test Dialog')).toBeInTheDocument();
    expect(getByText('Dialog content')).toBeInTheDocument();

    const closeButton = getByText('X');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    
    expect(handleCloseDialog).toHaveBeenCalledTimes(1);
  });
});
