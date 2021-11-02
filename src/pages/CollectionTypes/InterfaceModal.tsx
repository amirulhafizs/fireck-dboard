import Modal from "@material-ui/core/Modal";
import { CollectionType, FieldType } from "api/collectionTypes";
import CloseRounded from "@material-ui/icons/CloseRounded";
import { useState } from "react";
import Button from "components/Button";
import TypescriptSyntax from "components/TypescriptSyntax";
import SimpleBar from "simplebar-react";

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
            `${getGap(ident)}${
              b.id.includes(" ") || b.id.includes("-") ? `"${b.id}"` : b.id
            }: ${getType(b, ident + identStep)};\n`,
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
    any: () => "any",
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
  const [copied, setCopied] = useState(false);

  const interfaceString = collectionType ? generateInterface(collectionType) : "";

  return !collectionType ? null : (
    <Modal open={open} hideBackdrop>
      <div
        className="fixed left-0 top-0 w-full h-full flex overflow-auto bg-black bg-opacity-40 p-9"
        onMouseDown={onClose}
      >
        <div
          className="bg-white p-7 m-auto rounded md:max-w-lg max-w-sm w-full relative animate-littlemoveup"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <CloseRounded
            className="absolute top-0 right-0 cursor-pointer"
            onClick={onClose}
          ></CloseRounded>
          <div className="mb-7 text-22px capitalize font-medium">
            {collectionType.name} interface
          </div>
          <div className="relative rounded overflow-hidden">
            {copied ? (
              <div className="absolute z-20 text-white top-1 animate-littlemoveup right-1 cursor-pointer h-6 px-2 text-xs font-medium">
                Copied!
              </div>
            ) : (
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(interfaceString);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
                className="absolute min-w-unset z-20 top-1 right-1 text-xs cursor-pointer h-6 px-3 bg-fireck-4 hover:bg-fireck-4-hover"
              >
                Copy
              </Button>
            )}

            <TypescriptSyntax code={interfaceString}></TypescriptSyntax>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InterfaceModal;
