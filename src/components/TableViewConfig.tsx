import { FieldType } from "api/collectionTypes";
import Button from "components/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";
import { CallableComponent, callComponent } from "api/callComponent";

export interface TableViewConfigProps extends CallableComponent<{ fields: FieldType[] }> {
  fields: FieldType[];
}

const TableViewConfig: React.FC<TableViewConfigProps> = ({ fields, proceed }) => {
  const [flds, setFields] = React.useState<FieldType[]>([]);

  React.useEffect(() => {
    setFields(fields);
  }, [fields]);
  return (
    <div
      style={{ zIndex: 999999 }}
      className="fixed left-0 top-0 w-full h-full flex overflow-auto bg-black bg-opacity-40"
      onMouseDown={() => proceed({ fields: flds })}
    >
      <div
        className="m-auto rounded bg-white max-w-sm w-full relative p-7"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap -mx-2 mb-7">
          {flds.map((x, i) => (
            <div className="flex w-1/2 px-2 items-center" key={`fld-${i}`}>
              <FormControlLabel
                classes={{ label: "font-poppins line-clamp-1" }}
                control={
                  <Checkbox
                    classes={{ root: "text-blue-300" }}
                    className="mr-3"
                    checked={x.displayOnTable}
                    onChange={(e) =>
                      setFields((prev) => {
                        let arr = [...prev];
                        arr[i].displayOnTable = e.target.checked;
                        return arr;
                      })
                    }
                  ></Checkbox>
                }
                label={x.id}
              ></FormControlLabel>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => proceed({ fields: flds })}
            className="bg-orange-300 hover:bg-orange-301"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableViewConfig;

export const configureView = async ({
  fields,
  callback,
}: {
  fields: FieldType[];
  callback: (a: { fields: FieldType[] }) => void;
}) => {
  const res = await callComponent<TableViewConfigProps, { fields: FieldType[] }>({
    Component: TableViewConfig,
    props: {
      fields,
    },
  });
  callback(res);
};
