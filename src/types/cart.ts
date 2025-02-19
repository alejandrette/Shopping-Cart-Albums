export interface CartItem {
  id: number;
  title: string;
  price: number;
  cover: string;
  quantity: number
}

export interface CartHeader {
  carts: CartItem[];
  deleteToCart: (value: CartItem) => void;
  updatePlusCart: (value: CartItem) => void;
  updateSubtractCart: (value: CartItem) => void;
  isEmpty: boolean;
  cartTotal: number;
}