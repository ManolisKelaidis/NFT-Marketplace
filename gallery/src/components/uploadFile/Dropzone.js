import { useDropzone } from "react-dropzone";

import { style } from "../../constants/dropZoneconstants";

const Dropzone = ({
  maxFiles = 1,
  accept = "",
  className = "",
  onUpload,
  children,
  style,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles,
    accept,
    onDrop: onUpload,
  });

  const containerClass = className ? `dropzone ${className}` : "dropzone";
  return (
    <div
      name="file"
      {...getRootProps({
        style,
        className: containerClass,
      })}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default Dropzone;
