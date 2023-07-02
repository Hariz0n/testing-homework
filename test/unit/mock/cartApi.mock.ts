import {CartApi} from "../../../src/client/api";
import {CartState, Product} from "../../../src/common/types";

export class CartApiMock implements Omit<CartApi, ''> {
  private state: CartState = {}
  constructor(initialProducts?: Product[]) {
    initialProducts?.forEach((value, index) => {
      this.state[index] = {
        name: value.name,
        price: value.price,
        count: 1
      }
    })
  }

  getState(): CartState {
    return this.state;
  }

  setState(cart: CartState) {
    this.state = cart
  }
}