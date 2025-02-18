import { Header } from './components/Header'
import { useAlbums } from './hooks/useAlbums'
import { AlbumList } from './components/AlbumList'
import { Filters } from './components/Filters'
import { useFilters } from './hooks/useFilters'
import { useState } from 'react'
import { Album } from './types/album'

export default function App() {
  const { albums, loading, error } = useAlbums()
  const { filters, filteredAlbums, handleAuthorChange, handleMaxPriceChange, authorUnique } = useFilters(albums)
  const [carts, setCarts] = useState<Album[]>([])

  return (
    <>
      <Header
        carts={carts}
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
        setCarts={setCarts}
      />
    </>
  )
}
