import { Album } from "../types/album";

export type CartActions = 
{ type: 'add-to-cart', payload: { item: Album } } |
{ type: 'delete-to-cart', payload: { item: Album['id'] } } |
{ type: 'update-plus-cart', payload: { item: Album['id'] } } |
{ type: 'update-subtract-cart', payload: { item: Album['id'] } }

export type AlbumState = {
  cart: Album[]
}

export const initialState: AlbumState = {
  cart: []
}

export const cartReducer = (state: AlbumState = initialState, action: CartActions) => {
  if(action.type === 'add-to-cart'){
    const { item } = action.payload
    console.log(state.cart)
    return { ...state, cart: [...state.cart, { ...item, quantity: 1 }] };
  }

  if(action.type === 'delete-to-cart'){
    return {...state}
  }

  if(action.type === 'update-plus-cart'){
    return {...state}
  }

  if(action.type === 'update-subtract-cart'){
    return {...state}
  }

  return state
}