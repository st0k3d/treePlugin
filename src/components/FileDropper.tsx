import React from 'react';
import Dropzone from 'react-dropzone';

interface Props {
    fileDropHandler: (acceptedFiles:any[])=>void,
    accept?: string | string[] | undefined
    maxFiles?:number|undefined
    multiple?:boolean
    message?:string
}

const FileDropper: React.FunctionComponent<Props> = (props:Props) => {
  const {
    fileDropHandler, accept, maxFiles, multiple, message,
  } = props;

  return (
    <Dropzone
      accept={accept}
      maxFiles={maxFiles}
      multiple={multiple}
      onDrop={(acceptedFiles) => fileDropHandler(acceptedFiles)}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {message && <p>{message}</p>}
            {accept && (
            <em>
              (Only
              {accept}
              {' '}
              files will be accepted)
            </em>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default FileDropper;
