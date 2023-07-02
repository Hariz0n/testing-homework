import {addToCart, clearCart, initStore} from "../../src/client/store";
import {ExampleApiMock} from "./mock/exampleApi.mock";
import {CartApiMock} from "./mock/cartApi.mock";
import MOCK_PRODUCTS from "./mock/products.mock";

describe('Тестирование стора', function () {
  it('Добавление в стор', async function () {
    const api = new ExampleApiMock('');
    const cart = new CartApiMock();
    const store = initStore(api, cart);
    store.dispatch(addToCart(MOCK_PRODUCTS[0]))
    expect([Object.keys(store.getState().cart).length, store.getState().cart[0].count]).toStrictEqual([1, 1])
  });

  it('Увеличение количества в сторе', async function () {
    const api = new ExampleApiMock('');
    const cart = new CartApiMock(MOCK_PRODUCTS.slice(0,1));
    const store = initStore(api, cart);
    store.dispatch(addToCart(MOCK_PRODUCTS[0]))
    expect([Object.keys(store.getState().cart).length, store.getState().cart[0].count]).toStrictEqual([1, 2])
  });

  it('Очистка стора', async function () {
    const api = new ExampleApiMock('');
    const cart = new CartApiMock(MOCK_PRODUCTS.slice(0, 2));
    const store = initStore(api, cart);
    store.dispatch(clearCart())
    expect(Object.keys(store.getState().cart).length).toBe(0)
  });
});