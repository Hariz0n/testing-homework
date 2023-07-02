import {Product} from "../../src/common/types";
import {ExampleApiMock} from "./mock/exampleApi.mock";
import {CartApiMock} from "./mock/cartApi.mock";
import {initStore} from "../../src/client/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {render} from "@testing-library/react";
import React from "react";

export const getRenderedApp = (jsx: JSX.Element, initProducts?: Product[]) => {
  const api = new ExampleApiMock('');
  const cart = new CartApiMock(initProducts);
  const store = initStore(api, cart);
  const app = (
    <BrowserRouter basename={''}>
      <Provider store={store}>
        {jsx}
      </Provider>
    </BrowserRouter>
  )
  return render(app)
}