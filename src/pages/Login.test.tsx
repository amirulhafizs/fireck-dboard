import { mount } from "@cypress/react";
import Login from "./Login";
import NotificationsProvider from "components/NotificationsProvider";
import store from "store";
import { Provider } from "react-redux";
import "../index.css";

it("Renders login page", () => {
  mount(
    <Provider store={store}>
      <NotificationsProvider>
        <Login />
      </NotificationsProvider>
    </Provider>
  );
  cy.get("input[name=email]");
  cy.get("input[name=password]");
  cy.get("button").contains(/login/i);
});
