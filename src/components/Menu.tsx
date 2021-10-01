import Logo from "assets/logo.svg";
import VpnKeyRounded from "@material-ui/icons/VpnKeyRounded";
import PanoramaRounded from "@material-ui/icons/PanoramaRounded";
import BrushRounded from "@material-ui/icons/BrushRounded";
import Palette from "@material-ui/icons/Palette";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import { useSelector } from "react-redux";
import { RootState } from "store";
import ButtonBase from "@material-ui/core/ButtonBase";
import ImportExportRounded from "@material-ui/icons/ImportExportRounded";
import classNames from "classnames";
import { ReactComponent as Webhook } from "assets/webhook.svg";
import EmailIcon from "@material-ui/icons/Email";
import UpdateAppWidget from "components/UpdateAppWidget";

type MenuItem = {
  name: string;
  subitems: { icon: any; name: string; path: string }[];
  scroll?: boolean;
};

const Menu = ({ onClose = () => {} }: { onClose?: Function }) => {
  const [hoveredItem, setHoveredItem] = React.useState([-1, -1]);
  const history = useHistory();
  const { collections, logo } = useSelector((state: RootState) => ({
    user: state.user,
    collections: state.collectionTypes,
    logo: state.newAppearance.logo,
  }));

  const items: MenuItem[] = [
    {
      name: "Collections",
      scroll: true,
      subitems: collections.map((x) => ({
        icon: (props: any) => <div {...props}>•</div>,
        name: x.name,
        path: (x.single ? "/documents/" : "/collections/") + x.id,
      })),
    },
    {
      name: "General",
      scroll: false,
      subitems: [
        { icon: BrushRounded, name: "Collections", path: "/collections" },
        { icon: PanoramaRounded, name: "Media", path: "/media" },
        { icon: VpnKeyRounded, name: "Roles", path: "/roles" },
        { icon: Webhook, name: "Webhooks", path: "/webhooks" },
        { icon: EmailIcon, name: "Emails", path: "/emails" },
        { icon: Palette, name: "Appearance", path: "/appearance" },
        { icon: ImportExportRounded, name: "Import & export", path: "/import-export" },
      ],
    },
  ];

  const location = useLocation();

  return (
    <div className="h-full w-284px bg-blue-400 scrollbar-light flex-col flex">
      <div>
        <img
          alt=""
          onClick={() => history.push("/")}
          src={logo || Logo}
          className="mt-5 mb-4 ml-36px cursor-pointer max-w-212px flex-shrink-0"
        ></img>
      </div>
      <div className="pl-36px">
        <UpdateAppWidget />
      </div>
      <SimpleBar autoHide={false} className="flex-grow h-0 pt-3">
        {items.map((section, ind) => (
          <div key={`section-${ind}`} className="mb-6">
            <div className="uppercase text-sm font-bold text-white opacity-50 pl-36px h-36px flex items-center">
              {section.name}
            </div>
            <div className="pr-3">
              <SimpleBar
                className={classNames("pr-3", { "max-h-56": section.scroll })}
                autoHide={false}
              >
                {section.subitems.map((item, i) => (
                  <ButtonBase
                    onClick={() => {
                      history.push(item.path);
                      onClose();
                    }}
                    onMouseEnter={() => setHoveredItem([ind, i])}
                    onMouseLeave={() => setHoveredItem([-1, -1])}
                    key={`section-${ind}-item-${i}`}
                    className={`flex items-center text-white cursor-pointer outline-none w-full justify-start h-36px ${
                      (hoveredItem[0] === ind && hoveredItem[1] === i) ||
                      location.pathname === item.path
                        ? "bg-white bg-opacity-10"
                        : ""
                    }`}
                  >
                    <div className="w-36px h-full flex-shrink-0">
                      {(hoveredItem[0] === ind && hoveredItem[1] === i) ||
                      location.pathname === item.path ? (
                        <div className="bg-orange-300 w-9px h-full"></div>
                      ) : null}
                    </div>
                    <item.icon
                      className="text-white mr-2 flex-shrink-0"
                      fontSize="small"
                    ></item.icon>
                    <div className="capitalize truncate">{item.name}</div>
                  </ButtonBase>
                ))}
              </SimpleBar>
            </div>
          </div>
        ))}
      </SimpleBar>
    </div>
  );
};

const ResponsiveMenu = () => {
  const [menuOpened, setMenuOpened] = React.useState(false);
  return (
    <>
      <div className="h-full hidden md:block">
        <Menu></Menu>
      </div>
      <div className="fixed left-0 top-0 w-full bg-blue-400 h-64px flex md:hidden justify-between items-center text-white px-5">
        <div>
          <img alt="" src={Logo} width={115}></img>
        </div>
        <MenuIcon className="cursor-pointer" onClick={() => setMenuOpened(true)}></MenuIcon>
      </div>
      <Drawer open={menuOpened} onClose={() => setMenuOpened(false)} anchor="left">
        <Menu onClose={() => setMenuOpened(false)}></Menu>
      </Drawer>
    </>
  );
};

export default ResponsiveMenu;
