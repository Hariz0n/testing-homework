import React from "react";
import {render} from "@testing-library/react";
import {Application} from "../../src/client/Application";
import events from "@testing-library/user-event";
import {ExampleApiMock} from "./mock/exampleApi.mock";
import {CartApiMock} from "./mock/cartApi.mock";
import {addToCart, initStore} from "../../src/client/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import MOCK_PRODUCTS from "./mock/products.mock";

describe('Проверка формы корзины', function () {
  it('Отображение ошибки при пустом поле имени', async function () {
    const api = new ExampleApiMock('');
    const cart = new CartApiMock();
    const store = initStore(api, cart);
    const app = (
      <BrowserRouter basename={''}>
        <Provider store={store}>
          <Application/>
        </Provider>
      </BrowserRouter>
    )
    const {getByRole} = render(app)
    store.dispatch(addToCart(MOCK_PRODUCTS[0]))
    await events.click(getByRole('link', {name: /cart/i}))
  });
});