import { useAlbums } from './hooks/useAlbums'
import { useFilters } from './hooks/useFilters'
import { Header } from './components/Header'
import { Filters } from './components/Filters'
import { AlbumList } from './components/AlbumList'
import { Footer } from './components/Footer'
import { useCart } from './hooks/useCart'

export default function App() {

  const { albums, loading, error } = useAlbums()
  const { filters, filteredAlbums, handleAuthorChange, handleMaxPriceChange, authorUnique } = useFilters(albums)
  const { carts, addToCart, deleteToCart, updatePlusCart, updateSubtractCart, isEmpty, cartTotal } = useCart()

  return (
    <>
      <Header
        carts={carts}
        deleteToCart={deleteToCart}
        updatePlusCart={updatePlusCart}
        updateSubtractCart={updateSubtractCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
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
