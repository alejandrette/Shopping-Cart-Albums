import { useMemo, useState } from "react";
import { CartHeader } from "../types/cart";
import { GoPlus } from "react-icons/go";
import { TiDelete } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";

export function Header({ carts, dispatch }: CartHeader) {
  const [open, setOpen] = useState<boolean>(false);
  const cartQuantity: number = carts.length

  const isEmpty: boolean = useMemo(() => carts.length === 0, [carts])
  const cartTotal: number = useMemo(() => 
      carts.reduce((acc, item) => acc + (item.quantity * item.price), 0), [carts]); 

  return (
    <header className="w-full h-32 flex flex-row font-poppins p-10 items-center justify-between relative">
      <div className="absolute inset-0 bg-[url('/bg-header.png')] bg-cover bg-no-repeat bg-center opacity-20"></div>
      
      <div className="relative z-10 text-3xl md:pl-10">SoundWave <span className="text-orange-500 font-bold">Store</span></div>
      
      <div className="relative z-10 text-3xl pr-5 hover:text-orange-500">
        <button onClick={() => setOpen(!open)}>
          <FaCartShopping />
          {cartQuantity > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartQuantity}
          </span>
        )}
        </button>
      </div>

      {open && (
        <div className="absolute top-full right-5 w-80 max-h-80 bg-gray-800 shadow-lg rounded-lg p-4 mb-3 border border-gray-700 z-20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold mb-3">Shopping Cart</h3>
            <button className="mb-3" onClick={() => setOpen(!open)}><IoMdClose /></button>
          </div>
          <ul className="max-h-52 overflow-auto scrollbar-hide">
            {isEmpty ? (
              <span>The cart is empty</span>
            ) : (
              carts.map(cart => (
                <li 
                  key={cart.id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <div className="flex items-center">
                    <img src={cart.cover} alt={cart.title} className="w-10" />
                    <div className="ml-3 flex flex-col">
                      <span>{cart.title}</span>
                      <span className="text-gray-500">${cart.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <button onClick={() => dispatch({ type: 'update-subtract-cart', payload: { id: cart['id'] }})} disabled={cart.quantity <= 1}>
                        <RiSubtractFill />
                      </button>
                      <span className="px-1">{cart.quantity}</span>
                      <button onClick={() => dispatch({ type: 'update-plus-cart', payload: { id: cart['id'] }})}>
                        <GoPlus />
                      </button>
                    </div>
                    <TiDelete 
                      className="w-5 text-red-500 cursor-pointer" 
                      onClick={() => dispatch({ type: 'delete-to-cart', payload: { id: cart["id"] }})}
                    />
                  </div>
                </li>
              ))
            )}
          </ul>
          <button className="mt-3 w-full bg-red-500 text-white py-2 rounded">Total to pay ${cartTotal.toFixed(2)}</button>
        </div>
      )}
    </header>
  );
}
