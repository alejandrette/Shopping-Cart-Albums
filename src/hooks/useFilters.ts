import { useMemo, useState } from "react"

interface Album {
  id: number;
  title: string;
  author: string;
  cover: string;
  price: number;
}

interface Filters {
  author: string;
  maxPrice: number;
}

export function useFilters(albums: Album[] = []) {
  const [filters, setFilters] = useState<Filters>({
    author: 'all',
    maxPrice: 40
  })

  const filteredAlbums = useMemo(() => (
    albums?.filter(album => (
      album.price <= filters.maxPrice &&
      (filters.author === "all" || album.author === filters.author)
    ))
  ), [albums, filters])

  const handleAuthorChange = (value: string) => {
    setFilters(prevFilter =>({
      ...prevFilter,
      author: value
    }))
  }

  const handleMaxPriceChange = (value: number) => {
    setFilters(prevFilter =>({
      ...prevFilter,
      maxPrice: value
    }))
  }
 
  const authorUnique: string[] = [...new Set(albums?.map(album => album.author))]

  return { filters, filteredAlbums, handleAuthorChange, handleMaxPriceChange, authorUnique }
}
