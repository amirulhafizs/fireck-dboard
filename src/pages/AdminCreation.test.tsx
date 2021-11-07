import { mount } from "@cypress/react";
import AdminCreation from "./AdminCreation";
import NotificationsProvider from "components/NotificationsProvider";
import store from "store";
import { Provider } from "react-redux";
import "../index.css";

it("Renders login page", () => {
  mount(
    <Provider store={store}>
      <NotificationsProvider>
        <AdminCreation setIsAdminSet={() => {}} onClose={() => {}} />
      </NotificationsProvider>
    </Provider>
  );
  cy.get("input[name=email]");
  cy.get("input[name=password]");
  cy.get("input[name=confirmationPassword]");
  cy.get("input[name=subscribeEmails]");
  cy.get("button[type=submit]");
});
