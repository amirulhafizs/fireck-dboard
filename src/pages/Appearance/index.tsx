import Logo from "assets/logo.svg";
import Button from "components/Button";
import { useSelector } from "react-redux";
import store, { RootState } from "store";
import PageTitle from "components/PageTitle";
import LogoItem from "./Logo";
import Colors from "./Colors";
import { updateDocument } from "api/collections";

export interface AppearanceProps {}

export interface ApperanceItem {
  id: string;
  name: string;
  value: any;
  docId: string;
}

const COLLECTION_ID = "AppearanceReservedCollection";

const Appearance: React.FC<AppearanceProps> = () => {
  const appearance = useSelector((state: RootState) => state.appearance);

  const setItemValue = (val: any, index: number) => {
    let arr = [...appearance.items];
    arr[index].value = val;
    store.dispatch({ type: "SET_APPEARANCE", payload: arr });
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between mb-8">
        <PageTitle className="mb-4 mr-3">Appearance</PageTitle>
        <Button
          onClick={() => {
            appearance.items.forEach((x) => {
              updateDocument(COLLECTION_ID, x.docId, x);
            });
            store.dispatch({ type: "SET_APPEARANCE_SAVED" });
          }}
          disabled={appearance.saved}
          className={`h-34px ${
            !appearance.saved
              ? "bg-fireck-4 hover:bg-fireck-4-hover"
              : "bg-gray-300 text-gray-500 cursor-default"
          }  mb-4`}
        >
          {!appearance.saved ? "Save" : "Saved!"}
        </Button>
      </div>
      <div className="flex flex-wrap">
        {appearance.items.map((x, i) => (
          <div key={`appearance-item-${x.id}`} className="mb-7 mr-7">
            {x.id === "logo" ? (
              <LogoItem
                value={x.value || Logo}
                onValue={(val) => {
                  setItemValue(val, i);
                }}
              ></LogoItem>
            ) : x.id === "colors" ? (
              <Colors
                value={x.value}
                onValue={(val) => {
                  setItemValue(val, i);
                }}
              ></Colors>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appearance;
