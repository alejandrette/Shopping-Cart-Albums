import { useEffect, useState } from 'react'
import { Album } from './types/album'
import { CartItem } from './types/cart'
import { useAlbums } from './hooks/useAlbums'
import { useFilters } from './hooks/useFilters'
import { Header } from './components/Header'
import { Filters } from './components/Filters'
import { AlbumList } from './components/AlbumList'
import { Footer } from './components/Footer'

export default function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const { albums, loading, error } = useAlbums()
  const { filters, filteredAlbums, handleAuthorChange, handleMaxPriceChange, authorUnique } = useFilters(albums)
  const [carts, setCarts] = useState<Album[]>(initialCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(carts))
  }, [carts])

  const addToCart = (item: Album) => {
    item.quantity = 1
    setCarts(prevAlbum => [...prevAlbum, item])
  }

  const deleteToCart = (item: CartItem) => {
    setCarts(prevCart => prevCart.filter(i => i.id !== item.id))
  }

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

  return (
    <>
      <Header
        carts={carts}
        deleteToCart={deleteToCart}
        updatePlusCart={updatePlusCart}
        updateSubtractCart={updateSubtractCart}
      />
      {error && <div className="text-red-500 text-center text-2xl">Error: {error}</div>}
      <Filters 
        filters={filters}
        authorUnique={authorUnique}
        onAuthorChange={handleAuthorChange}
        onMaxPriceChange={handleMaxPriceChange}
      />
      <AlbumList 
        albums={filteredAlbums}
        loading={loading}
        addToCart={addToCart}
        deleteToCart={deleteToCart}
        carts={carts}
      />
      <Footer />
    </>
  )
}
