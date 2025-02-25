import { Album } from "../types/album";

export type CartActions = 
{ type: 'add-to-cart', payload: { item: Album } } |
{ type: 'delete-to-cart', payload: { id: Album['id'] } } |
{ type: 'update-plus-cart', payload: { id: Album['id'] } } |
{ type: 'update-subtract-cart', payload: { id: Album['id'] } }

export type AlbumState = {
  cart: Album[]
}

const localStorageCart = (): Album[] => {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

export const initialState: AlbumState = {
  cart: localStorageCart()
}

export const cartReducer = (state: AlbumState = initialState, action: CartActions) => {
  if(action.type === 'add-to-cart'){
    const { item } = action.payload
    return { ...state, cart: [...state.cart, { ...item, quantity: 1 }] };
  }

  if(action.type === 'delete-to-cart'){
    return {...state, cart: state.cart.filter(album => album.id !== action.payload.id)}
  }

  if(action.type === 'update-plus-cart'){
    return {...state, cart: state.cart.map(album => album.id === action.payload.id ? { ...album, quantity: album.quantity + 1 } : album)}
  }

  if(action.type === 'update-subtract-cart'){
    return {...state, cart: state.cart.map(album => album.id === action.payload.id ? { ...album, quantity: album.quantity - 1 } : album)}
  }

  return state
}