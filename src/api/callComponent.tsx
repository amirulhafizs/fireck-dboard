import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "store";

export interface CallableComponent<T> {
  proceed: (v: T) => void;
}

interface callComponentArgs<T> {
  Component: React.FC<any>;
  props: Omit<T, "proceed">;
}

export function callComponent<T, RT>({ Component, props }: callComponentArgs<T>): Promise<RT> {
  return new Promise((resolve, reject) => {
    const wrapper = document.getElementById("root")?.appendChild(document.createElement("div"));
    if (wrapper) {
      ReactDOM.render(
        <Provider store={store}>
          <Component
            {...props}
            proceed={(val: RT) => {
              ReactDOM.unmountComponentAtNode(wrapper);
              wrapper.parentNode?.removeChild(wrapper);
              resolve(val);
            }}
          />
        </Provider>,
        wrapper
      );
    }
  });
}
