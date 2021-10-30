import { SectionType } from "./index";
import SimpleBar from "simplebar-react";
import SearchRounded from "@material-ui/icons/SearchRounded";
import ButtonBase from "@material-ui/core/ButtonBase";
import classNames from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import CloseRounded from "@material-ui/icons/CloseRounded";

interface SectionProps {
  section: SectionType;
  onCloseMenu: () => void;
}

const Section: React.FC<SectionProps> = ({ section, onCloseMenu }) => {
  const history = useHistory();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [searchON, setSearchON] = useState(false);

  return (
    <div className="mb-6">
      {searchON ? (
        <div className="flex items-center mb-5">
          <input
            placeholder="type here..."
            className="h-5 border border-white rounded text-sm focus:outline-none bg-transparent text-white px-2"
            type="text"
            value={search}
            onChange={(e) => {
              e.persist();
              setSearch(e.target.value);
            }}
          ></input>
          <CloseRounded
            className="text-lg cursor-pointer text-white ml-1"
            fontSize="inherit"
            onClick={() => setSearchON(false)}
          ></CloseRounded>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-5 pr-5">
          <div className="capitalize text-sm text-white underline pl-2">{section.name}</div>
          <div className="flex items-center">
            {!section.searchable ? null : (
              <div
                onClick={() => setSearchON(true)}
                className="h-5 px-1 border-white border rounded text-white cursor-pointer flex items-center"
              >
                <SearchRounded fontSize="inherit" className="text-sm"></SearchRounded>
              </div>
            )}
            {!section.onAdd ? null : (
              <div
                onClick={section.onAdd}
                className="h-5 leading-5 ml-3 font-medium bg-fireck-4 hover:bg-fireck-4-hover px-2 rounded cursor-pointer text-10px"
              >
                Add
              </div>
            )}
          </div>
        </div>
      )}

      <div className="pr-2">
        <SimpleBar
          style={{ maxHeight: section.scroll ? 200 : "unset" }}
          className={classNames("pr-3 scrollbar-dark")}
          autoHide={false}
        >
          {section.subitems
            .filter(
              (x) => !search || !searchON || x.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, i) => (
              <ButtonBase
                onClick={() => {
                  history.push(item.path);
                  onCloseMenu();
                }}
                key={`section-${section.name}-item-${i}`}
                className={classNames(
                  `flex items-center rounded cursor-pointer hover:bg-fireck-2-hover text-white px-2 outline-none w-full justify-start h-28px`,
                  {
                    "text-fireck-4 bg-fireck-2-hover": location.pathname === item.path,
                  }
                )}
              >
                <item.icon className="mr-2 flex-shrink-0" fontSize="small"></item.icon>
                <div className="capitalize truncate">{item.name}</div>
              </ButtonBase>
            ))}
        </SimpleBar>
      </div>
    </div>
  );
};

export default Section;
