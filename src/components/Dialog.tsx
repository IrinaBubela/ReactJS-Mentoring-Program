import React, { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';

interface DialogProps {
  title: string;
  onCloseDialog: () => void;
  children: JSX.Element;
}

const Dialog: React.FC<PropsWithChildren<DialogProps>> = ({ title, onCloseDialog, children }) => {

  return createPortal(
    <FocusTrap focusTrapOptions={{
      clickOutsideDeactivates: true,
      tabbableOptions: {
        displayCheck: 'none'
      }
    }}>
      <div className="modal" role="dialog" onClick={onCloseDialog}>
        <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title">{title}</h5>
              <div className="text-end">
                <button className="btn btn-secondary" type="button" onClick={onCloseDialog}>X</button>
              </div>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </FocusTrap>,
    document.body,
  );
};

export default Dialog;