import { callComponent } from "api/callComponent";
import Button from "components/Button";

export interface CreateIndexModalProps {
  proceed: Function;
  url: string;
}

const CreateIndexModal: React.FC<CreateIndexModalProps> = ({ proceed, url }) => {
  return (
    <div
      className="fixed left-0 top-0 w-full h-full flex bg-black bg-opacity-40"
      onMouseDown={() => proceed(false)}
    >
      <div onMouseDown={(e) => e.stopPropagation()} className="bg-white rounded p-7  m-auto">
        <div className="mb-12">This query requires creating an index.</div>
        <div className="flex justify-between">
          <Button
            noMinWidth
            className="bg-blue-300 hover:bg-blue-400 text-white h-28px"
            onClick={() => proceed(false)}
          >
            Later
          </Button>
          <Button
            noMinWidth
            className="bg-fireck-4 hover:bg-fireck-4-hover h-28px"
            onClick={() => {
              window.open(url, "_blank");
              proceed(false);
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateIndexModal;

export const createIndex = (url: string) => {
  callComponent<CreateIndexModalProps, boolean>({ Component: CreateIndexModal, props: { url } });
};
