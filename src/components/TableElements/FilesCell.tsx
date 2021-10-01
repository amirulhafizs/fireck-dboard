import React from "react";

const Image = ({ url, className = "", ...rest }: { url: string; [index: string]: any }) => {
  return (
    <div
      {...rest}
      className={"bg-white rounded-full border-2 border-white box-content " + className}
    >
      <div
        className={"w-full h-full rounded-full bg-center bg-cover"}
        style={{ backgroundImage: `url(${url})` }}
      ></div>
      <img src={url} alt="" className="hidden"></img>
    </div>
  );
};

export interface FilesProps {
  files?: string[];
  file?: string;
}

const Files: React.FC<FilesProps> = ({ files, file }) => {
  const id = React.useRef<number>(Math.random());
  const [active, setActive] = React.useState(-1);

  return (
    <div className="flex justify-center">
      {(files ? files : file ? [file] : []).slice(0, 4).map((f, i) => (
        <div
          key={`${id}-file-${i}`}
          style={{ marginLeft: i === 0 ? 0 : "-10px" }}
          className="relative"
        >
          <Image
            className="w-7 h-7"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(-1)}
            url={f}
          ></Image>
          <div
            className={`${
              active === i ? "" : "hidden"
            } absolute bottom-full flex justify-center w-9`}
          >
            <Image url={f} className="w-16 h-16 flex-shrink-0 -translate-y-7"></Image>
          </div>
        </div>
      ))}
      {files && files.length > 4 ? (
        <div style={{ marginLeft: "-10px" }} className="relative">
          <div className="w-7 h-7 rounded-full bg-blue-300 text-sm text-white flex items-center justify-center border-2 box-content border-white">
            {files.length - 4}+
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Files;
