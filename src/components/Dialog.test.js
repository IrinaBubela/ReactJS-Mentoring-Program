import { fireEvent, render } from '@testing-library/react';
import Dialog from './Dialog.tsx'; 

describe('Dialog Component', () => {

  it('renders dialog with title and close button', () => {
    const onCloseDialog = jest.fn();
    const { getByText } = render(
      
      <Dialog title="Dialog Title" onCloseDialog={onCloseDialog}>
        <div>Dialog Child</div>
      </Dialog>
    );

    expect(getByText('Dialog Title')).toBeInTheDocument();
    expect(getByText('Dialog Child')).toBeInTheDocument();

    fireEvent.click(getByText('X')); 
    expect(onCloseDialog).toHaveBeenCalled();
  });
});