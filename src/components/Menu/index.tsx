import Logo from "assets/logo.svg";
import VpnKeyRounded from "@mui/icons-material/VpnKeyRounded";
import PanoramaRounded from "@mui/icons-material/PanoramaRounded";
import BrushRounded from "@mui/icons-material/BrushRounded";
import Palette from "@mui/icons-material/Palette";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SimpleBar from "simplebar-react";
import Drawer from "@mui/material/Drawer";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "store";
import ImportExportRounded from "@mui/icons-material/ImportExportRounded";
import { ReactComponent as Webhook } from "assets/webhook.svg";
import EmailIcon from "@mui/icons-material/Email";

import Section from "./Section";

export type SectionType = {
  name: string;
  subitems: { icon: any; name: string; path: string }[];
  scroll?: boolean;
  onAdd?: () => void;
  searchable?: boolean;
};

const Menu = ({ onCloseMenu = () => {} }: { onCloseMenu?: () => void }) => {
  const history = useHistory();
  const [showSystemCollections, setShowSystemCollections] = useState(false);
  const { collections, logo } = useSelector(
    (state: RootState) => ({
      user: state.user,
      collections: state.collectionTypes,
      logo: state.appearance.items.find((x) => x.id === "logo")?.value,
    }),
    shallowEqual
  );

  const items: SectionType[] = [
    {
      name: "Collections",
      scroll: true,
      subitems: collections
        .filter((x) => showSystemCollections || !x.isSystem)
        .map((x) => ({
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
        // { icon: EmailIcon, name: "Emails", path: "/emails" },
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
          {process.env.NODE_ENV === "production" ? null : (
            <div
              className="text-white py-1 text-xs cursor-pointer"
              onClick={() => setShowSystemCollections((prev) => !prev)}
            >
              {showSystemCollections ? "Hide" : "Show"} system collections
            </div>
          )}
        </SimpleBar>
      </div>
    </div>
  );
};

const ResponsiveMenu: React.FC<{ setMenuOpened: (val: boolean) => void; menuOpened: boolean }> = ({
  setMenuOpened,
  menuOpened,
}) => {
  return (
    <>
      <div className="h-full hidden md:block">
        <Menu></Menu>
      </div>

      <Drawer open={menuOpened} onClose={() => setMenuOpened(false)} anchor="left">
        <Menu onCloseMenu={() => setMenuOpened(false)}></Menu>
      </Drawer>
    </>
  );
};

export default ResponsiveMenu;
