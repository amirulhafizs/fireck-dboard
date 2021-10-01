import Modal from "@material-ui/core/Modal";
import { CollectionType, FieldType } from "api/collectionTypes";

export interface InterfaceModalProps {
  open: boolean;
  collectionType?: CollectionType;
  onClose: () => void;
}

const getGap = (count: number) => {
  return new Array(count).fill(0).reduce((a, b) => a + " ", "");
};

const getType = (type: FieldType, ident: number, identStep: number = 3): string => {
  const docType = (fields: FieldType[], multiple: boolean = false) => {
    return fields.length
      ? `{\n${fields.reduce(
          (a, b) =>
            a +
            `${getGap(ident)}${b.id.includes(" ") ? `"${b.id}"` : b.id}: ${getType(
              b,
              ident + identStep
            )};\n`,
          ""
        )}${getGap(ident - identStep)}${multiple ? "}[]" : "}"}`
      : multiple
      ? "any[]"
      : "null";
  };

  const types = {
    password: () => "string",
    string: () => "string",
    "rich-text": () => "string",
    json: () => "object",
    map: () => "object",
    array: () => "any[]",
    media: (x: FieldType) => (x.mediaSingle ? "string" : "string[]"),
    date: () => "string",
    enum: () => "string[]",
    number: () => "number",
    boolean: () => "boolean",
    relation: (x: FieldType) => (x.relationOneToOne ? "string" : "string[]"),
    collection: (x: FieldType) => docType(x.collectionFields, true),
    document: (x: FieldType) => docType(x.documentFields),
    script: () => "object",
    "script-V2": () => "object",
  };
  return `${types[type.type](type)}`;
};

export const generateInterface = (colType: CollectionType) => {
  const docType: any = {
    type: "document",
    documentFields: colType.fields,
  };

  const intface = `interface Document ${getType(docType, 3)}`;
  return intface;
};

const InterfaceModal: React.FC<InterfaceModalProps> = ({ open, collectionType, onClose }) => {
  return !collectionType ? null : (
    <Modal open={open} hideBackdrop>
      <div
        className="fixed left-0 top-0 w-full h-full overflow-auto flex bg-black bg-opacity-40"
        onClick={onClose}
      >
        <div
          className="bg-white p-7 m-auto rounded-md md:max-w-lg max-w-sm w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-7 text-22px capitalize font-medium">
            {collectionType.name} interface
          </div>
          <div className="rounded bg-gray-300 p-7 overflow-auto">
            <pre>{generateInterface(collectionType)}</pre>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InterfaceModal;
