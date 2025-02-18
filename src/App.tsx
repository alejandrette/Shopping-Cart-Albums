import { Header } from './components/Header'
import { useAlbums } from './hooks/useAlbums'
import { AlbumList } from './components/AlbumList'
import { Filters } from './components/Filters'
import { useFilters } from './hooks/useFilters'
import { useState } from 'react'
import { Album } from './types/album'
import { CartItem } from './types/cart'

export default function App() {
  const { albums, loading, error } = useAlbums()
  const { filters, filteredAlbums, handleAuthorChange, handleMaxPriceChange, authorUnique } = useFilters(albums)
  const [carts, setCarts] = useState<Album[]>([])

  const addToCart = (item: Album) => {
    item.quantity = 1
    setCarts(prevAlbum => [...prevAlbum, item])
  }

  const deleteToCart = (item: CartItem) => {
    setCarts(prevCart => prevCart.filter(i => i !== item))
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
    </>
  )
}
