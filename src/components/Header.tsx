import { useMemo, useState } from "react";
import { CartItem } from "../types/cart";
import { GoPlus } from "react-icons/go";
import { TiDelete } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";

interface HeaderProps {
  carts: CartItem[];
  deleteToCart: (value: CartItem) => void;
  updatePlusCart: (value: CartItem) => void;
  updateSubtractCart: (value: CartItem) => void;
}

export function Header({ carts, deleteToCart, updatePlusCart, updateSubtractCart }: HeaderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const isEmpty: boolean = useMemo(() => carts.length === 0, [carts]) 
  const cartTotal: number = useMemo(() => 
    carts.reduce((acc, item) => acc + (item.quantity * item.price), 0), [carts]);  

  return (
    <header className="w-full h-32 flex flex-row font-poppins p-10 items-center justify-between relative">
      <div className="absolute inset-0 bg-[url('../../public/bg-header.png')] bg-cover bg-no-repeat bg-center opacity-20"></div>
      
      <div className="relative z-10 text-3xl md:pl-10">SoundWave <span className="text-orange-500 font-bold">Store</span></div>
      
      <div className="relative z-10 text-3xl pr-5 hover:text-orange-500">
        <button onClick={() => setOpen(!open)}>
          <FaCartShopping />
        </button>
      </div>

      {open && (
        <div className="absolute top-full right-5 w-80 max-h-80 bg-gray-800 shadow-lg rounded-lg p-4 mb-3 border border-gray-700 z-20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold mb-3">Shopping Cart</h3>
            <button className="mb-3" onClick={() => setOpen(!open)}><IoMdClose /></button>
          </div>
          <ul className="max-h-52 overflow-auto">
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
                    <span className="ml-3">{cart.title} - ${cart.price}</span>
                  </div>
                  <div className="flex items-center pr-2">
                    <button onClick={() => updateSubtractCart(cart)} disabled={cart.quantity <= 1}><RiSubtractFill /></button>
                    <span className="px-1">{cart.quantity}</span>
                    <button onClick={() => updatePlusCart(cart)}><GoPlus /></button>
                  </div>
                  <TiDelete 
                    className="w-5 text-red-500 cursor-pointer" 
                    onClick={() => deleteToCart(cart)}  
                  />
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
