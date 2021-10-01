import InsertPhoto from "@material-ui/icons/InsertPhoto";
import React from "react";
import DeleteRounded from "@material-ui/icons/DeleteRounded";
import ButtonBase from "@material-ui/core/ButtonBase";
import { callComponent } from "api/callComponent";
import SelectMedia, { SelectMediaProps } from "pages/Media/SelectMedia";

export interface SingleMediaInputProps {
  selectedFile: string;
  setSelectedFile: Function;
}

const SingleMediaInput: React.FC<SingleMediaInputProps> = ({ selectedFile, setSelectedFile }) => {
  return (
    <div className="h-208px bg-blue-300 rounded relative">
      {!selectedFile ? (
        <div
          className="flex w-full h-full cursor-pointer relative z-10"
          onClick={async () => {
            const res = await callComponent<SelectMediaProps, string | boolean>({
              Component: SelectMedia,
              props: { multiple: false },
            });

            if (typeof res !== "boolean") {
              setSelectedFile(res);
            }
          }}
        >
          <div className="m-auto flex items-center text-white">
            <InsertPhoto className="text-39px mr-3" fontSize="inherit"></InsertPhoto>
            <div>Upload a file</div>
          </div>
        </div>
      ) : null}

      <div
        className="absolute left-0 top-0 w-full h-full bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${selectedFile})` }}
      ></div>
      {selectedFile ? (
        <div className="absolute top-0 right-0 flex p-3">
          <ButtonBase
            onClick={() => setSelectedFile(null)}
            className="outline-none h-26px w-26px rounded bg-orange-300 hover:bg-orange-301"
          >
            <DeleteRounded fontSize="small"></DeleteRounded>
          </ButtonBase>
        </div>
      ) : null}
    </div>
  );
};

export default SingleMediaInput;
