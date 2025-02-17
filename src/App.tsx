import './App.css'
import { Header } from './components/Header'
import { useAlbums } from './hooks/useAlbums'
import { AlbumList } from './components/AlbumList'
import { Filters } from './components/Filters'
import { useFilters } from './hooks/useFilters'

export default function App() {
  const { albums, loading, error } = useAlbums()

  const { filters, filteredAlbums, handleAuthorChange, handleMaxPriceChange, authorUnique } = useFilters(albums)

  return (
    <>
      <Header />
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
      />
    </>
  )
}
