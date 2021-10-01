import { Route, Switch } from "react-router-dom";
import React from "react";

const ReadNetlifyToken = React.lazy(() => import("./ReadNetlifyToken"));
const CollectionTypes = React.lazy(() => import("pages/CollectionTypes"));
const Collection = React.lazy(() => import("pages/Collection"));
const Document = React.lazy(() => import("./Document"));
const Media = React.lazy(() => import("pages/Media"));
const Roles = React.lazy(() => import("pages/Roles"));
const Appearance = React.lazy(() => import("pages/Appearance"));
const ImportExport = React.lazy(() => import("pages/ImportExport"));
const Integrations = React.lazy(() => import("pages/Integrations"));
const Payments = React.lazy(() => import("pages/Payments"));
const Emails = React.lazy(() => import("pages/Emails"));
const Webhooks = React.lazy(() => import("pages/Webhooks"));

export interface PagesProps {
  className?: string;
}

const Pages: React.FC<PagesProps> = ({ className = "" }) => {
  const routes = [
    { path: "/", component: CollectionTypes },
    { path: "/collections/:id/add", component: Document },
    { path: "/collections/:id/edit/:docId", component: Document },
    { path: "/collections/:id", component: Collection },
    { path: "/documents/:id", component: Document },
    { path: "/collections", component: CollectionTypes },
    { path: "/media", component: Media },
    { path: "/roles", component: Roles },
    { path: "/appearance", component: Appearance },
    { path: "/import-export", component: ImportExport },
    { path: "/emails", component: Emails },
    { path: "/webhooks", component: Webhooks },
  ];

  return (
    <Switch>
      {routes.map((x, i) => (
        <Route
          key={`route-${i}`}
          path={x.path}
          exact
          render={(props: any) => (
            <x.component key={props.match.params.id} {...props}></x.component>
          )}
        ></Route>
      ))}
      <Route path="/read-netlify-token" exact component={ReadNetlifyToken}></Route>
    </Switch>
  );
};

export default Pages;
