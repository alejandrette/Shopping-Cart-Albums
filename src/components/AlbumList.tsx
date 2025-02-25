import { ActionDispatch, useState } from "react";
import { Loader } from "./Loader";
import { Album } from "../types/album";
import { CartActions } from "../reducers/cart-reducer";

interface AlbumListProps {
  albums: Album[];
  loading: boolean;
  dispatch: ActionDispatch<[action: CartActions]>
  //deleteToCart: (value: Album) => void;
  carts: Album[];
}

const ITEMS_PER_PAGE = 6; // Número de álbumes por página

export function AlbumList({ albums, loading, dispatch, carts }: AlbumListProps) {

  const [currentPage, setCurrentPage] = useState(1);

  // Calcular los índices para los álbumes a mostrar
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentAlbums = albums.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(albums.length / ITEMS_PER_PAGE);

  
  return (
    <>
      {loading 
        ? <Loader />
        : (
          <div className="flex flex-col items-center mx-auto max-w-6xl mt-6 mb-6 px-4">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 justify-center place-items-center">
              {currentAlbums.length === 0 ? (
                <div className="col-span-3 flex justify-center items-center w-full h-full">
                  <span className="text-gray-200">There are no albums</span>
                </div>
              ) : (
                currentAlbums.map(album => (
                  <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col min-h-[450px] h-full" key={album.id}>
                    <a href={`https://www.last.fm/es/music/${album.author}/${album.title}`} target="_blank">
                      <img className="p-8 rounded-t-lg" src={album.cover} alt={album.title} />
                    </a>
                    <div className="px-5 pb-5">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{album.title}</h5>
                      <div className="flex items-center mt-2.5 mb-5 text-gray-500 font-black">
                        <span>{album.author}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${album.price}</span>
                        {carts.some(item =>item.id === album.id) 
                          ? (
                            <button 
                              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                              onClick={() => dispatch({ type: 'delete-to-cart', payload: { id: album["id"] }})}
                            >
                              Delete to cart
                            </button>
                          )
                          : (
                            <button 
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={() => dispatch({ type: 'add-to-cart', payload: {item: album} })}
                            >
                              Add to cart
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                )))}
            </div>
  
            <div className="w-full flex justify-center mt-10">
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-gray-600 text-white rounded-md mx-4">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )
      }
    </>
  )
}
