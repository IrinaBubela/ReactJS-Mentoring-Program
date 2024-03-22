import React from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';
import MovieForm from './MovieForm';
import { InitialMovieInfoInterface } from '../App';

interface DialogProps {
  title: string;
  initialMovieInfo: InitialMovieInfoInterface;
  onSubmitDialog: (movieInfo: InitialMovieInfoInterface) => void;
  onCloseDialog: () => void;
}

const Dialog: React.FC<DialogProps> = ({ title, initialMovieInfo, onSubmitDialog, onCloseDialog }) => {
  const onClose = () => {
    onCloseDialog();
  };

  const onSubmit = (movieInfo: InitialMovieInfoInterface) => {
    onSubmitDialog(movieInfo);
  };

  return createPortal(
    <FocusTrap
      focusTrapOptions={{
        tabbableOptions: {
          displayCheck: 'none'
        }
      }}
    >
      <div className="container-modal" tabIndex={-1}>
        <div className="modal show fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between">
                <h2>{title}</h2>
                <div className="text-end">
                  <button className="btn btn-secondary" type="button" onClick={onClose}>X</button>
                </div>
              </div>
              <div className="modal-body">
                <MovieForm initialMovieInfo={initialMovieInfo} onSubmit={onSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>,
    document.body
  );
};

export default Dialog;
