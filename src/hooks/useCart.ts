import { useEffect, useMemo, useState } from 'react'
import { CartItem } from '../types/cart'
import { Album } from '../types/album'

export function useCart() {
  
  // Setear el carrito almacenado del local
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  // Guaradar ese local en el estado
  const [carts, setCarts] = useState<Album[]>(initialCart)
  
  // Almacenar en local el carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(carts))
  }, [carts])
  
  // Al anadir un album al carrito se crea la cantidad de 1
  const addToCart = (item: Album) => {
    item.quantity = 1
    setCarts(prevAlbum => [...prevAlbum, item])
  }
  
  // Eliminar albums del carrito
  const deleteToCart = (item: CartItem) => {
    setCarts(prevCart => prevCart.filter(i => i.id !== item.id))
  }
  
  // Actualizar cantidad ya sea sumar o restar
  const updatePlusCart = (item: CartItem) => {
    const updateCart: Album[] = [...carts]
    const index = carts.findIndex(cart => cart.id === item.id)
    updateCart[index].quantity++
    setCarts(updateCart)
  }
  
  const updateSubtractCart = (item: CartItem) => {
    const updateCart: Album[] = [...carts]
    const index = carts.findIndex(cart => cart.id === item.id)
    updateCart[index].quantity--
    setCarts(updateCart)
  }

  // Comprobar si el carro esta vacio y sumar el total del carrito
  const isEmpty: boolean = useMemo(() => carts.length === 0, [carts])
  const cartTotal: number = useMemo(() => 
    carts.reduce((acc, item) => acc + (item.quantity * item.price), 0), [carts]);  

  return { carts, addToCart, deleteToCart, updatePlusCart, updateSubtractCart, isEmpty, cartTotal }
}
