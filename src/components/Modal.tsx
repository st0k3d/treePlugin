import React, { useCallback, useEffect } from 'react';

interface Props {
    body:JSX.Element;
    isOpen:boolean;
    title?:string;
    url?:string;
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FunctionComponent<Props> = (props:Props) => {
  const {
    body, title, isOpen, url, setIsOpen,
  } = props;

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const handleUserKeyPress = useCallback((event) => {
    const { keyCode } = event;

    if (keyCode === 27) {
      setIsOpen(false);
    }
  }, [setIsOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <>
      {isOpen && (
      <div className="modal">
        <div className="modal-title">
          <div>{title}</div>
          <div title="Close" onClick={handleOnClose}><span className="close-icon" /></div>
        </div>
        <div className="modal-label">
          <div>Label</div>
        </div>
        <div className="modal-content">{body}</div>
        <div className="modal-actions">
          <div>
            <a href={url}>Link</a>
          </div>
          <div>
            <button type="button" onClick={handleOnClose}>Done</button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Modal;
