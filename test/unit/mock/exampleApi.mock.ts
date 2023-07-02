import {ExampleApi} from "../../../src/client/api";
import {CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo} from "../../../src/common/types";
import {AxiosResponse} from "axios";
import MOCK_PRODUCTS from "./products.mock";

export class ExampleApiMock extends ExampleApi{
  constructor(basename: string) {
    super(basename)
  }
  async checkout(form: CheckoutFormData, cart: CartState): Promise<AxiosResponse<CheckoutResponse>> {
    return Promise.resolve({
      status: 200,
      statusText: 'OK',
      data: {id: 1},
      config: {},
      headers: {}
    });
  }

  async getProductById(id: number): Promise<AxiosResponse<Product>> {
    const product = MOCK_PRODUCTS.find(el => el.id = id)
    return Promise.resolve({
      status: 200,
      statusText: 'OK',
      data: product,
      config: {},
      headers: {}
    })
  }

  async getProducts(): Promise<AxiosResponse<ProductShortInfo[]>> {
    return Promise.resolve({
      status: 200,
      statusText: 'OK',
      data: MOCK_PRODUCTS,
      config: {},
      headers: {},
    })
  }
}
