import React from "react";
import MediaField from "./MediaField";

export interface FilesProps {
  files?: string[];
  file?: string;
}

const Files: React.FC<FilesProps> = ({ files, file }) => {
  const id = React.useRef<number>(Math.random());

  return (
    <div className="flex justify-center">
      {(files ? files : file ? [file] : []).slice(0, 4).map((f, i) => (
        <div key={`${id}-file-${i}`} className="mr-0.5">
          <MediaField src={f}></MediaField>
        </div>
      ))}
      {files && files.length > 4 ? (
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-fireck-4 text-10px flex items-center justify-center">
            {files.length - 4}+
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Files;
