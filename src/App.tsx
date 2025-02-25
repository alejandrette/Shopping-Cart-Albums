import { useAlbums } from './hooks/useAlbums'
import { useFilters } from './hooks/useFilters'
import { Header } from './components/Header'
import { Filters } from './components/Filters'
import { AlbumList } from './components/AlbumList'
import { Footer } from './components/Footer'
import { useReducer } from 'react'
import { cartReducer, initialState } from './reducers/cart-reducer'

export default function App() {

  const { albums, loading, error } = useAlbums()
  const { filters, filteredAlbums, handleAuthorChange, handleMaxPriceChange, authorUnique } = useFilters(albums)
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        carts={state.cart}
        dispatch={dispatch}
      />
      {error && <div className="text-red-500 text-center text-2xl">Error: {error}</div>}
      
      <main className="flex-grow">
        <Filters 
          filters={filters}
          authorUnique={authorUnique}
          onAuthorChange={handleAuthorChange}
          onMaxPriceChange={handleMaxPriceChange}
        />
        <AlbumList 
          albums={filteredAlbums}
          loading={loading}
          carts={state.cart}
          dispatch={dispatch}
        />
      </main>

      <Footer />
    </div>
  )
}
