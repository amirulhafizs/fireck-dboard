import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ReactComponent as DropzoneImage } from "assets/dropzone.svg";

const MyDropzone = ({
  onFiles,
  accept = "",
  multiple = false,
  onClick = () => {},
  disabled = false,
}: {
  onFiles: Function;
  accept?: string;
  multiple?: boolean;
  onClick?: Function;
  disabled?: boolean;
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFiles(acceptedFiles);
    },
    [onFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  return (
    <div
      className="hover:opacity-80 cursor-pointer"
      onMouseDown={() => {
        onClick();
      }}
      {...getRootProps()}
    >
      <input disabled={disabled} {...getInputProps()} />
      <DropzoneImage className="w-full"></DropzoneImage>
    </div>
  );
};

export default MyDropzone;
