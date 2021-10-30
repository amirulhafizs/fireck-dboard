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

import SearchRounded from "@material-ui/icons/SearchRounded";
import Section from "./Section";

export type SectionType = {
  name: string;
  subitems: { icon: any; name: string; path: string }[];
  scroll?: boolean;
  onAdd?: () => void;
  searchable?: boolean;
};

const Menu = ({ onCloseMenu = () => {} }: { onCloseMenu?: () => void }) => {
  const [hoveredItem, setHoveredItem] = React.useState([-1, -1]);
  const history = useHistory();
  const { collections, logo } = useSelector((state: RootState) => ({
    user: state.user,
    collections: state.collectionTypes,
    logo: state.newAppearance.logo,
  }));

  const items: SectionType[] = [
    {
      name: "Collections",
      scroll: true,
      subitems: collections.map((x) => ({
        icon: (props: any) => <div {...props}>•</div>,
        name: x.name,
        path: (x.single ? "/documents/" : "/collections/") + x.id,
      })),
      searchable: true,
      onAdd: () => history.push("/collections"),
    },
    {
      name: "General",
      scroll: false,
      searchable: true,
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

  return (
    <div style={{ width: 263 }} className="h-full bg-fireck-2 scrollbar-dark flex-col flex pl-5">
      <div>
        <img
          alt=""
          onClick={() => history.push("/")}
          src={logo || Logo}
          style={{ maxWidth: 212 }}
          className="mt-5 mb-4 cursor-pointer flex-shrink-0 pl-2"
        ></img>
      </div>
      <div className="flex-grow h-0">
        <SimpleBar autoHide={false} className="max-h-full pt-3 scrollbar-dark">
          {items.map((section, ind) => (
            <Section key={`section-${ind}`} section={section} onCloseMenu={onCloseMenu}></Section>
          ))}
        </SimpleBar>
      </div>
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
      <div className="fixed left-0 top-0 w-full bg-fireck-2 h-34px flex md:hidden justify-between items-center text-white px-5">
        <div>
          <img alt="" src={Logo} width={85}></img>
        </div>
        <MenuIcon className="cursor-pointer" onClick={() => setMenuOpened(true)}></MenuIcon>
      </div>
      <Drawer open={menuOpened} onClose={() => setMenuOpened(false)} anchor="left">
        <Menu onCloseMenu={() => setMenuOpened(false)}></Menu>
      </Drawer>
    </>
  );
};

export default ResponsiveMenu;
