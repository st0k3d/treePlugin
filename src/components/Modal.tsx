import React, { useCallback, useEffect } from 'react';

interface Props {
    body:JSX.Element;
    isOpen:boolean;
    title?:string;
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FunctionComponent<Props> = (props:Props) => {
  const {
    body, title, isOpen, setIsOpen,
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

  const modalTitleStyle = {
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    height: '3em',
    borderBottom: 'thin solid #ccc',
    borderRadius: '4px 4px 0 0',
  };

  const labelStyle = {
    borderBottom: 'thin solid #e8e8e8',
    height: '1.5em',
    boxShadow: '0px 2px 3px -2px #e8e8e8',
  };

  const labelElStyle = {
    fontSize: '.85em',
    opacity: '.25',
    marginTop: '1em',
    marginLeft: '1em',
  };

  const contentStyle = {
    height: '78%',
    overflow: 'scroll',
  };

  const actionsStyle = {
    borderTop: 'thin solid #ccc',
    overflow: 'hidden',
    height: '3em',
  };

  const closeStyle = {
    marginTop: '1em',
    marginRight: '1em',
    float: 'right' as 'right',
    opacity: 0.25,
    cursor: 'pointer',
  };

  const titleElStyle = {
    marginTop: '1em',
    marginLeft: '1em',
    float: 'left' as 'left',
    fontSize: '.85em',
  };

  const modalStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '320px',
    height: '640px',
    display: 'block',
    background: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  };

  const linkStyle = {
    float: 'left' as 'left',
    marginTop: '1em',
    marginLeft: '1em',
  };

  const buttonStyle = {
    float: 'right' as 'right',
  };

  const buttonElStyle = {
    backgroundColor: '#4285f4',
    color: 'white',
    marginTop: '1em',
    marginRight: '1em',
    borderRadius: '2px',
    border: 'none',
    width: '4.5em',
    height: '2.25em',
    fontSize: '0.85em',
    cursor: 'pointer',
  };

  return (
    <>
      {isOpen && (
      <div style={modalStyle} className="modal" id="modal">
        <div style={modalTitleStyle}>
          <div style={titleElStyle}>{title}</div>
          <div title="Close" style={closeStyle} onClick={handleOnClose}><span className="close-icon" /></div>
        </div>
        <div style={labelStyle}>
          <div style={labelElStyle}>Label</div>
        </div>
        <div style={contentStyle} className="content">{body}</div>
        <div style={actionsStyle} className="actions">
          <div style={linkStyle}><a className="modal-link" href="https://www.coatue.com" title="Coatue">Link</a></div>
          <div style={buttonStyle}>
            <button className="modal-button" type="button" onClick={handleOnClose}>Done</button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Modal;
