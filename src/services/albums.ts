import { Album } from "../types/album";

export const getAlbums = async (): Promise<Album[]> => {
  try {
    const response = await fetch('/public/albums.json')

    if (!response.ok) {
      throw new Error(`Failed to fetch albums ${response.status}`)
    }

    const albums: Album[] = await response.json()
    return albums;
  } catch (error) {
    throw new Error('Failed to fetch albums' + (error as Error).message)
  }
}