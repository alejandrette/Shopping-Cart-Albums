import { ActionDispatch } from "react";
import { CartActions } from "../reducers/cart-reducer";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  cover: string;
  quantity: number
}

export interface CartHeader {
  carts: CartItem[];
  dispatch: ActionDispatch<[action: CartActions]>
}