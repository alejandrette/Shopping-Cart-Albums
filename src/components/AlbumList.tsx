import { Loader } from "./Loader";

interface Album {
  id: number;
  title: string;
  author: string;
  cover: string;
  price: number;
}

interface AlbumListProps {
  albums: Album[];
  loading: boolean;
}

export function AlbumList({ albums, loading }: AlbumListProps) {

  return (
    <>
      {loading 
        ? <Loader />
        : (
          <div className="grid grid-cols-3 gap-6 justify-center mx-auto max-w-6xl mt-6 mb-6">
            {albums.map(album => (
              <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700" key={album.id}>
                  <a href={`https://www.last.fm/es/music/${album.author}/${album.title}`} target="_blank">
                      <img className="p-8 rounded-t-lg" src={album.cover} alt="product image" />
                  </a>
                  <div className="px-5 pb-5">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{album.title}</h5>
                      <div className="flex items-center mt-2.5 mb-5 text-gray-500 font-black">
                          <span>{album.author}</span>
                      </div>
                      <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">${album.price}</span>
                          <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                      </div>
                  </div>
              </div>
            ))}
          </div>
        )
      }
    </>
  )
}
