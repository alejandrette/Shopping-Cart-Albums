import { Album } from "../types/album";

export type CartActions = 
{ type: 'add-to-card', payload: { item: Album } } |
{ type: 'delete-to-card', payload: { item: Album['id'] } } |
{ type: 'update-plus-cart', payload: { item: Album['id'] } } |
{ type: 'update-subtract-cart', payload: { item: Album['id'] } }

