import { useEffect, useState } from "react";
import { getAlbums } from "../services/albums";
import { Album } from "../types/album";

export function useAlbums() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAlbums()
      .then(data => setAlbums(data))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false))
  }, [])

  return { albums, loading, error }
}