import FieldTypes from "components/fieldTypes";
import React from "react";
import { FieldInputType } from "api/collectionTypes";
import Button from "components/Button";

export interface SelectFieldTypeProps {
  proceed: Function;
}

const SelectFieldType: React.FC<SelectFieldTypeProps> = ({ proceed }) => {
  const [fieldType, setFieldType] = React.useState("string" as FieldInputType);

  return (
    <div className="fixed left-0 top-0 w-full h-full flex overflow-auto bg-black bg-opacity-40">
      <div className="m-auto rounded bg-white p-9 max-w-600px w-full">
        <div className="text-22px font-medium mb-9">Select field type</div>
        <div className="mb-12">
          <div className="flex flex-wrap">
            {FieldTypes.map((x, i) => (
              <div
                data-testid={`fieldtype-option-${x.type}`}
                onClick={() => setFieldType(x.type as FieldInputType)}
                key={`field-type-${i}`}
                className={`flex md:w-1/3 sm:w-1/2 w-full select-none p-4 border-4 border-solid border-white items-center cursor-pointer rounded  ${
                  fieldType === x.type
                    ? "border-orange-300"
                    : "hover:border-gray-300 hover:bg-gray-300"
                }`}
              >
                <div className="flex items-center pointer-events-none">
                  <x.Badge></x.Badge>
                  <span className="capitalize ml-2 line-clamp-1">{x.type.replace("-", " ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            data-testid="cancel-field-type-btn"
            onClick={() => {
              proceed(false);
            }}
            className="bg-blue-300 hover:bg-blue-400 text-white"
          >
            Cancel
          </Button>
          <Button
            data-testid="submit-field-type-btn"
            onClick={() => {
              proceed(fieldType);
            }}
            className="bg-orange-300 hover:bg-orange-301"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectFieldType;
